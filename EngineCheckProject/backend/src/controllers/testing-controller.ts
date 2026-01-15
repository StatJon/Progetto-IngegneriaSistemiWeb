import { Request, Response } from "express";
import { connection } from "../utils/db";

export const testingJson = async (req: Request, res: Response) => {
    res.status(200).json({message : "Ciao dal Backend!"})
}