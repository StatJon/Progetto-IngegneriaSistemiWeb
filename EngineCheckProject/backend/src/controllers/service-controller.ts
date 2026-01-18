import { Request, Response } from "express";
import { connection } from "../utils/db";

export const servicesCarAll = async (req: Request, res: Response) => {
  try {
    const [results] = (await connection.execute(
      "SELECT * FROM SERVICE WHERE Vehicle_Type = 'car'",
      []
    )) as any;
    if (!Array.isArray(results) || results.length == 0){
        res
        .status(401)
        .json({ message: "Servizi mancanti." });
      return;
    }
    res.json(results);

  } catch (error) {
    console.error("Errore: ", error);
    res.status(500).json({ message: "Errore del Server/DB", error: error });
  }
};
