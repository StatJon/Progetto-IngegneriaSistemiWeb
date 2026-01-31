import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import {
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateAdmin,
  errorHandler,
  validateCustomer,
} from "../utils/auth-helpers";
import { connection } from "../utils/db";

export const customerPage = async (req: Request, res: Response) => {
  try {
    const user = validateCustomer(req, res);
    const [results] = await connection.execute(
      `
        SELECT 
        DATE(j.Date_Time) AS Date,
        TIME(j.Date_Time) AS Time,
        j.Model,
        j.License_Plate,
        GROUP_CONCAT(s.Title SEPARATOR ', ') AS Services
        FROM JOB j
        JOIN JOB_SERVICE js ON j.Job_ID = js.JOB_Job_ID
        JOIN SERVICE s ON s.Service_ID = js.SERVICE_Service_ID
        WHERE j.CUSTOMER_ID = ?
        `,
      [user.id],
    );
    if (!Array.isArray(results) || results.length == 0) {
      res.status(401).json({ message: "Nessun servizio prenotato." });
      return;
    }
    res.status(200).json(results);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const jobDetails = async (req: Request, res: Response) => {
  try {
    const user = validateCustomer(req, res);
    const [results] = (await connection.execute(
      `
        SELECT 
        DATE(j.Date_Time) AS Date,
        TIME(j.Date_Time) AS Time,
        j.Model,
        j.License_Plate,
        s.Title,
        c.ID_Customer
        FROM JOB j
        JOIN JOB_SERVICE js ON j.Job_ID = js.JOB_Job_ID
        JOIN SERVICE s ON s.Service_ID = js.SERVICE_Service_ID
        JOIN CUSTOMER c ON j.CUSTOMER_ID = c.ID_Customer
        WHERE j.Job_ID = ?
        `,
      [req.params.jobId],
    )) as any;

    if (results.length === 0) {
      res.status(404).json({ message: "Errore: Lavoro inesistente" });
      return;
    }

    if (results[0].ID_Customer !== user.id) {
      res.status(400).json({ message: "Errore: Utente errato" });
      return;
    }

    const resultsFrontend = {
      Date: results[0].Date,
      Time: results[0].Time,
      Model: results[0].Model,
      License_Plate: results[0].License_Plate,
      ID_Customer: results[0].ID_Customer,
      Services: results.map((row: any) => row.Title),
    };
    res.status(200).json(resultsFrontend);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const jobDelete = async (req: Request, res: Response) => {
  try {
    validateCustomer(req, res);
    const [result] = (await connection.execute(
      `
        DELETE FROM JOB
        WHERE Job_ID = ?
        `,
      [req.params.jobId],
    )) as any;

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Errore: lavoro inesistente" });
    }
    res
      .status(200)
      .json({ message: "Successo: Lavoro eliminato correttamente" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};
