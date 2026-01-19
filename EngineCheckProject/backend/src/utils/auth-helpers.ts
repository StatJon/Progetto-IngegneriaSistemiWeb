import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";


export const validateUserLoggedIn = (req: Request, res: Response) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).json({ message: "Attenzione: autenticazione richiesta" });
    throw new Error("User is not logged in");
  }
  return user;
};

//Usabile solo dopo un verifyUserLoggedIn
export const validateAdmin = (req: Request, res: Response, user: User) => {
  if (user.role !== "Admin") {
    res
      .status(403)
      .json({ message: "Attenzione: operazione non autorizzabile" });
    throw new Error("User is not Admin");
  }
  return user;
};

//Da usare come catch nei try-catch dei controller
export const errorHandler = async (req: Request, res: Response, error:any) => {
  if (res.headersSent) return;
  console.error(`Errore in ${req.method} ${req.url}: `, error);
    res.status(500).json({ message: "Errore del Server/DB", error: error });
};

//Metodo di testing, non usare
export const adminTest = async (req: Request, res: Response) => {
  try {
    const user = validateUserLoggedIn(req, res);
    validateAdmin(req, res, user);
    res.status(200).json(user);
  } catch (error) {errorHandler(req,res,error)}
};