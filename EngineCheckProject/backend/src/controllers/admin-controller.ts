import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import {
  validateUserLoggedIn,
  validateAdmin,
  errorHandler,
} from "../utils/auth-helpers";
import { connection } from "../utils/db";

export const listAllEmployees = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);
    const [employeeList] = (await connection.execute(
      "SELECT ID_Badge_Number, First_Name, Last_Name, Role FROM EMPLOYEE",
      []
    )) as any;

    res.status(200).json(employeeList);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const registerEmployee = async (req: Request, res: Response) => {
  try {
    //Controllo Login
    validateAdmin(req, res);

    //Recupera dati
    const { First_Name, Last_Name, Password } = req.body;

    //Controllo Campi mancanti
    if (!First_Name || !Last_Name || !Password) {
      res.status(400).json({ message: "Compilare tutti i campi obbligatori" });
      return;
    }

    //Hashing password
    const passwordHash = await bcrypt.hash(Password, 10);

    //INSERT
    //Nota: const [insertResult] serve per estrarre l'ID creato da DB AUTO_INCREMENT
    await connection.execute(
      "INSERT INTO EMPLOYEE (First_Name, Last_Name, Password) VALUES (?, ?, ?)",
      [First_Name, Last_Name, passwordHash]
    );

    res
      .status(201)
      .json({
        message: "Successo: Registrazione effettuata con successo",
        employee: First_Name + " " + Last_Name,
      });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const removeEmployee = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);

    const { ID_Badge_Number } = req.body;

    const [employeeToBeDeleted] = (await connection.execute(
      "SELECT First_Name, Last_Name, Role FROM EMPLOYEE WHERE ID_Badge_Number = ?",
      [ID_Badge_Number]
    )) as any;

    if (employeeToBeDeleted.Role === "Admin") {
      res
        .status(401)
        .json({ message: "Attenzione: Dipendente Admin non cancellabile" });
      return;
    }

    await connection.execute(
      "DELETE * FROM EMPLOYEE WHERE 'ID_Badge_Number = ?",
      [ID_Badge_Number]
    );

    res.status(200).json({
      message: "Successo, Dipendente rimosso",
      employee:
        employeeToBeDeleted.First_Name + " " + employeeToBeDeleted.Last_Name,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};
