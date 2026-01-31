import { Request, Response } from "express";
import { connection } from "../utils/db.js";
import { validateAdmin, validateEmployee, validateUserLoggedIn, validateUserNotLoggedIn, errorHandler } from "../utils/auth-helpers.js";

export const testingJson = async (req: Request, res: Response) => {
    res.status(200).json({message : "Ciao dal Backend!"})
};

export const testCustomer = async (req: Request, res: Response) => {
  try {
    const user = validateUserLoggedIn(req,res);
    const [results] = (await connection.execute(
      "SELECT Phone FROM CUSTOMER WHERE ID_Customer=?",
      [user.id]
    )) as any;
    if (!Array.isArray(results) || results.length == 0){
        res
        .status(401)
        .json({ message: "Attenzione: Utente non esistente." });
      return;
    }
    const phone = results[0].Phone;

    res.json({ id: user.id, phone: phone });
  } catch (error) {errorHandler(req,res,error)}
};