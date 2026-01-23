import { Request, Response } from "express";
import { connection } from "../utils/db";
import { errorHandler } from "../utils/auth-helpers";

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
      ["car"]
    )) as any;
    if (!Array.isArray(results) || results.length == 0){
        res
        .status(401)
        .json({ message: "Servizi mancanti." });
      return;
    }
    res.status(200).json(results);

  } catch (error) {errorHandler(req,res,error)}
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
      ["motorcycle"]
    )) as any;
    if (!Array.isArray(results) || results.length == 0){
        res
        .status(401)
        .json({ message: "Servizi mancanti." });
      return;
    }
    res.status(200).json(results);

  } catch (error) {errorHandler(req,res,error)}
};