import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";

//METODI VALIDATE
//Usare un solo metodo "validate..." per controller
//Usare const user = metodoValidate(req,res) solo se serve salvare il JWT per essere usato dopo
//Usare metodoValidate(req,res) se serve solo verificare lo stato del JWT

export const validateUserLoggedIn = (req: Request, res: Response) => {
  const user = getUser(req, res);
  if (!user) {
    res.status(401).json({ message: "Attenzione: autenticazione richiesta" });
    throw new Error("User is not logged in");
  }
  return user;
};

export const validateUserNotLoggedIn = (req: Request, res: Response) => {
  const user = getUser(req, res);
  if (user) {
    res.status(401).json({ message: "Attenzione: Logout richiesto per l'operazione" });
    throw new Error("User should not be logged in");
  }
  return user;
};

export const validateAdmin = (req: Request, res: Response) => {
  const user = validateUserLoggedIn(req,res);
  if (user.role !== "Admin") {
    res
      .status(403)
      .json({ message: "Attenzione: richiesto Admin" });
    throw new Error("User is not Admin");
  }
  return user;
};

export const validateEmployee = (req: Request, res: Response) => {
  const user = validateUserLoggedIn(req,res);
  if (!(user.role === "Worker" || user.role === "Admin")) {
    res
      .status(403)
      .json({ message: "Attenzione: utente non autorizzato" });
    throw new Error("User is not Employee");
  }
  return user;
};

export const validateCustomer = (req: Request, res: Response) => {
  const user = validateUserLoggedIn(req,res);
  if (user.role !== "Customer" ) {
    res
      .status(403)
      .json({ message: "Attenzione: utente non autorizzato" });
    throw new Error("User is not Customer");
  }
  return user;
};

//Da usare come catch nei try-catch dei controller
export const errorHandler = async (req: Request, res: Response, error:any) => {
  if (!res.headersSent){
    console.error(`Server Error in ${req.method} ${req.url}: `, error);
    res.status(500).json({ message: "Errore del Server/DB" });
  }else{
  console.warn(`Controller Error in ${req.method} ${req.url}: `, error);
  }
};

//Metodo di testing, non usare
export const adminTest = async (req: Request, res: Response) => {
  try {
    const user = validateUserLoggedIn(req, res);
    validateAdmin(req, res);
    res.status(200).json(user);
  } catch (error) {errorHandler(req,res,error)}
};