import { Request, Response } from "express";
import { connection } from "../utils/db.js";
import { errorHandler } from "../utils/auth-helpers.js";

export const servicesCarAll = async (req: Request, res: Response) => {
  try {
    const [results] = (await connection.execute(
      `SELECT
      Service_ID,
      Estimated_Duration_Minutes as Minutes,
      Title,
      Description,
      Price, 
      Category
      FROM SERVICE 
      WHERE Vehicle_Type = ?
      `,
      ["car"],
    )) as any;
    if (!Array.isArray(results) || results.length === 0) {
      res.status(400).json({ message: "Servizi mancanti." });
      return;
    }
    res.status(200).json(results);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const servicesMotorcycleAll = async (req: Request, res: Response) => {
  try {
    const [results] = (await connection.execute(
      `
      SELECT
      Service_ID,
      Estimated_Duration_Minutes as Minutes,
      Title,
      Description,
      Price, 
      Category
      FROM SERVICE 
      WHERE Vehicle_Type = ?
      `,
      ["motorcycle"],
    )) as any;
    if (!Array.isArray(results) || results.length === 0) {
      res.status(400).json({ message: "Servizi mancanti." });
      return;
    }
    res.status(200).json(results);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const servicesSelect = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (!id) {
      res.status(400).json({ message: "Selezionare almeno un servizio" });
      return;
    }
    const services = (id as string).split(",").map((id) => parseInt(id, 10));
    const placeholders = services.map(() => "?").join(", ");
    const [results] = (await connection.query(
      `SELECT
      Service_ID,
      Estimated_Duration_Minutes as Minutes,
      Title,
      Description,
      Price, 
      Category
      FROM SERVICE 
      WHERE Service_ID IN (${placeholders})
      `,
      services,
    )) as any;
    res.status(200).json(results);
  } catch (error) {
    errorHandler(req, res, error);
  }
};
