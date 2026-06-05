import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validateAdmin, errorHandler } from "../utils/auth-helpers.js";
import { connection } from "../utils/db.js";

export const listAllEmployees = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);
    const [employeeList] = (await connection.execute(
      "SELECT ID_Badge_Number, First_Name, Last_Name, Role FROM EMPLOYEE",
      [],
    )) as any;

    res.status(200).json(employeeList);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const listWorkerEmployees = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);
    const [employeeList] = (await connection.execute(
      "SELECT ID_Badge_Number, First_Name, Last_Name, Role FROM EMPLOYEE WHERE Role = 'Worker'",
      [],
    )) as any;

    res.status(200).json(employeeList);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const setEmployeeJob = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);
    const { Job_ID, Service_ID, EMPLOYEE_Badge_Number } = req.body;

    const [checkRows]: any = await connection.execute(
      `SELECT JobService_Status FROM JOB_SERVICE
       WHERE JOB_Job_ID = ? AND SERVICE_Service_ID = ?`,
      [Job_ID, Service_ID],
    );

    if (checkRows.length === 0) {
      return res.status(404).json({ message: "Errore: Nessun lavoro trovato"})
    }

    const statusToCheck = checkRows[0].JobService_Status;
    if (['Working', 'Completed', 'Cancelled'].includes(statusToCheck)){
      return res.status(409).json({ message: "Errore: Lavoro in stato non modificabile"})
    }

    await connection.execute(
      `UPDATE JOB_SERVICE
       SET EMPLOYEE_Badge_Number = ?, 
       JobService_Status = 'Assigned'
       WHERE JOB_Job_ID = ? AND SERVICE_Service_ID = ?`,
      [EMPLOYEE_Badge_Number, Job_ID, Service_ID],
    );
    res.status(200).json({ message: "Successo: Lavoro assegnato" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const unSetEmployeeJob = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);
    const { Job_ID, Service_ID } = req.body;

    const [checkRows]: any = await connection.execute(
      `SELECT JobService_Status FROM JOB_SERVICE
       WHERE JOB_Job_ID = ? AND SERVICE_Service_ID = ?`,
      [Job_ID, Service_ID],
    );

    if (checkRows.length === 0) {
      return res.status(404).json({ message: "Errore: Nessun lavoro trovato"})
    }

    const statusToCheck = checkRows[0].JobService_Status;
    if (['Working', 'Completed', 'Cancelled'].includes(statusToCheck)){
      return res.status(409).json({ message: "Errore: Lavoro in stato non modificabile"})
    }

    await connection.execute(
      `UPDATE JOB_SERVICE
       SET EMPLOYEE_Badge_Number = NULL, 
       JobService_Status = 'Pending'
       WHERE JOB_Job_ID = ? AND SERVICE_Service_ID = ?`,
      [Job_ID, Service_ID],
    );
    res.status(200).json({ message: "Successo: Lavoro de-assegnato" });
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export const registerEmployee = async (req: Request, res: Response) => {
  try {
    //Controllo Login
    validateAdmin(req, res);

    //Recupera dati
    const { First_Name, Last_Name, Password, Role } = req.body;

    //Controllo Campi mancanti
    if (!First_Name || !Last_Name || !Password || !Role) {
      res.status(400).json({ message: "Compilare tutti i campi obbligatori" });
      return;
    }

    //Hashing password
    const passwordHash = await bcrypt.hash(Password, 10);

    //INSERT
    //Nota: const [insertResult] serve per estrarre l'ID creato da DB AUTO_INCREMENT
    await connection.execute(
      "INSERT INTO EMPLOYEE (First_Name, Last_Name, Password, Role) VALUES (?, ?, ?, ?)",
      [First_Name, Last_Name, passwordHash, Role],
    );

    res.status(201).json({
      message: "Successo: Registrazione effettuata con successo",
      first_name: First_Name,
      last_name: Last_Name,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const removeEmployee = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);

    const { ID_Badge_Number } = req.body;

    const [employeeRaw] = (await connection.execute(
      "SELECT First_Name, Last_Name, Role FROM EMPLOYEE WHERE ID_Badge_Number = ?",
      [ID_Badge_Number],
    )) as any;

    const employee = employeeRaw[0];

    if (employee.Role === "Admin") {
      res
        .status(401)
        .json({ message: "Attenzione: Dipendente Admin non cancellabile" });
      return;
    }

    await connection.execute(
      `
      UPDATE EMPLOYEE
      SET Role = 'Inactive'
      WHERE ID_Badge_Number = ?
      `,
      [ID_Badge_Number],
    );

    res.status(200).json({
      message: "Successo, Dipendente rimosso",
      badge: ID_Badge_Number,
      first_name: employee.First_Name,
      last_name: employee.Last_Name,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};
