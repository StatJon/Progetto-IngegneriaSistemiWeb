import { Request, Response } from "express";
import jwt from "jsonwebtoken";

//Definizione struttura JWT
export interface User {
  id: number | string; //NOTA: number per badge admin/worker; string per email customer
  role: "admin" | "worker" | "customer";
}

//Recupero e check JWT_SECRET da .env
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Errore: JWT_SECRET mancante, controllare in file .env");
}
//Recupero e check COOKIE_NAME da .env
const COOKIE_NAME = process.env.COOKIE_NAME;
if (!COOKIE_NAME) {
  throw new Error("Errore: COOKIE_NAME mancante, controllare in file .env");
}

//setUser: assegna access token JWT tramite Cookie
export const setUser = (req: Request, res: Response, user: User) => {
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" });
  res.cookie(COOKIE_NAME, accessToken, {
    maxAge: 86400000,
    httpOnly: true,
    sameSite: true, //nota: in caso di errori nella comunicazione tra frontend e backend cambiare on true con lax e riprovare
    // secure: true //commentato per uso tramite localhost
  });
};

//getUser: decodifica e verifica access token, richiamare ad ogni controllo AUTH
export const getUser = (req: Request, res: Response) => {
  const accessToken = req.cookies[COOKIE_NAME];
  if (!accessToken) return null;
  try {
    const user = jwt.verify(accessToken, JWT_SECRET) as User;
    return user;
  } catch {
    return null;
  }
};

//unsetUser: logout con cancella cookie di access token
export const unsetUser = (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
};


//DA TRASFORMARE IN WRAPPER COME onServerErrorHandled
export const blockIfLoggedIn = (req: Request, res: Response) => {
  const user = getUser(req, res);
  if (user) {
    res.status(401).json({ message: "Questa operazione richiede il logout."});
    return true;
  }
  return false;
};
