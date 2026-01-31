import bcrypt from "bcrypt"; //Libreria Hashing Password
import { parsePhoneNumber } from "awesome-phonenumber"; //Libreria Validazione numeri telefono
import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth.js";
import {
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateAdmin,
  errorHandler,
} from "../utils/auth-helpers.js";
import { connection } from "../utils/db.js";


export const registerCustomer = async (req: Request, res: Response) => {
  try {
    validateUserNotLoggedIn(req, res);

    //Recupera dati
    const { Email, First_Name, Last_Name, Password, Phone } = req.body;

    //Controllo Campi mancanti
    if (!Email || !First_Name || !Last_Name || !Password || !Phone) {
      res.status(400).json({ message: "Compilare tutti i campi obbligatori" });
      return;
    }

    //Controllo email già esistente
    const [emails] = await connection.execute(
      "SELECT Email FROM CUSTOMER WHERE Email=?",
      [Email]
    );
    if (Array.isArray(emails) && emails.length > 0) {
      res.status(400).json({
        message: "Attenzione: Account già registrato con questa email",
      });
      return;
    }

    //Validazione numero di telefono
    const phoneParser = parsePhoneNumber(Phone, { regionCode: "IT" });
    if (!phoneParser.valid) {
      res
        .status(400)
        .json({ message: "Attenzione: Numero di telefono non valido" });
      return;
    }
    const phoneFormatted = phoneParser.number?.e164;

    //Hashing password
    const passwordHash = await bcrypt.hash(Password, 10);

    //INSERT
    //Nota: const [insertResult] serve per estrarre l'ID creato da DB AUTO_INCREMENT
    const [insertResult] = (await connection.execute(
      "INSERT INTO CUSTOMER (Email, First_Name, Last_Name, Password, Phone) VALUES (?, ?, ?, ?, ?)",
      [Email, First_Name, Last_Name, passwordHash, phoneFormatted]
    )) as any; //<-- Nota: "as any" workaround per sopprimere TS e restituire .insertID sotto
    const newUserId = insertResult.insertId;

    //LOGIN, creazione JWT
    //Nota: metodo .toString() per necessità JWT
    const userJwtPayload: User = {
      id: newUserId.toString(),
      role: "Customer",
    };
    setUser(req, res, userJwtPayload);
    res
      .status(201)
      .json({ message: "Successo: Registrazione effettuata con successo" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const loginCustomer = async (req: Request, res: Response) => {
  try {
    validateUserNotLoggedIn(req, res);

    //Recupera dati
    const { Email, Password } = req.body;

    //Controllo campi mancanti
    if (!Email || !Password) {
      res.status(400).json({ message: "Email e Password sono obbligatori" });
      return;
    }

    //Ricerca email
    const [results] = await connection.execute(
      "SELECT ID_Customer, Email, Password FROM CUSTOMER WHERE Email=?",
      [Email]
    );

    //Errore, email inesistente
    if (!Array.isArray(results) || results.length == 0) {
      res.status(400).json({ message: "Credenziali errate." });
      return;
    }

    const userData = results[0] as any;

    //Controlla password
    const correctPassword = await bcrypt.compare(Password, userData.Password);

    //Errore, password errata
    if (!correctPassword) {
      res.status(400).json({ message: "Credenziali errate." });
      return;
    }

    // Delete per sicurezza
    delete userData.Password;

    //Creazione esplicita del JWT
    const userJwtPayload: User = {
      id: userData.ID_Customer.toString(),
      role: "Customer",
    };
    setUser(req, res, userJwtPayload);

    res.json({ message: "Successo: Login effettuato correttamente" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const loginEmployee = async (req: Request, res: Response) => {
  try {
    validateUserNotLoggedIn(req, res);

    //Recupera dati
    const { BadgeNumber, Password } = req.body;

    //Controllo campi mancanti
    if (!BadgeNumber || !Password) {
      res
        .status(400)
        .json({ message: "Numero di Badge e Password sono obbligatori" });
      return;
    }

    //Ricerca BadgeNumber
    const [results] = await connection.execute(
      "SELECT ID_Badge_Number, Password, Role FROM EMPLOYEE WHERE ID_Badge_Number = ?",
      [BadgeNumber]
    );

    //Errore, BadgeNumber inesistente
    if (!Array.isArray(results) || results.length == 0) {
      res.status(400).json({ message: "Credenziali errate." });
      return;
    }

    const userData = results[0] as any;

    //Controlla password
    const correctPassword = await bcrypt.compare(Password, userData.Password);

    //Errore, password errata
    if (!correctPassword) {
      res.status(400).json({ message: "Credenziali errate." });
      return;
    }
    // Delete per sicurezza
    delete userData.Password;

    //Creazione esplicita del JWT
    const userJwtPayload: User = {
      id: userData.ID_Badge_Number.toString(),
      role: userData.Role,
    };
    setUser(req, res, userJwtPayload);

    res.json({ message: "Successo: Login effettuato correttamente" });
  } catch (error) {
    console.error("Errore: ", error);
    res.status(500).json({ message: "Errore del Server/DB", error: error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    //validateUserLoggedIn(req,res); //non necessario, se non c'era il JWT è comunque non loggato
    unsetUser(req, res);

    res.json({ message: "Successo, Logout effettuato correttamente" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

//DEV: non usare
export const templateAuth = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error("Errore: ", error);
    res.status(500).json({ message: "Errore del Server/DB", error: error });
  }
};
