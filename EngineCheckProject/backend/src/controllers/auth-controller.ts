import bcrypt from "bcrypt";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Request, Response } from "express";
import { getUser, onUserLoggedInBlock, setUser, unsetUser, User } from "../utils/auth";
import { connection } from "../utils/db";

export const registerCustomer = async (req: Request, res: Response) => {
  //Controllo Login
  const userLogged = getUser(req, res);
  if (userLogged) {
    res
      .status(401)
      .json({ message: "Attenzione: Logout richiesto per l'operazione" });
    return;
  }

  //Recupera dati
  const { Email, First_Name, Last_Name, Password, Phone } = req.body;

  //Controllo Campi mancanti
  if (!Email || !First_Name || !Last_Name || !Password || !Phone) {
    res.status(400).json({ message: "Compilare tutti i campi obbligatori" });
    return;
  }

  try {
    //Controllo email già esistente
    const [emails] = await connection.execute(
      "SELECT Email FROM CUSTOMER WHERE Email=?",
      [Email]
    );
    if (Array.isArray(emails) && emails.length > 0) {
      res
        .status(400)
        .json({
          message: "Attenzione: Account già registrato con questa email",
        });
      return;
    }

    //validazione numero di telefono
    const phoneParser = parsePhoneNumber(Phone, { regionCode: "IT" });
    if (!phoneParser.valid) {
      res.status(400).json({ message: "Attenzione: Numero di telefono non valido" });
      return;
    }
    const phoneFormatted = phoneParser.number?.e164;

    //hashing password
    const passwordHash = await bcrypt.hash(Password, 10);

    //INSERT
    //Nota: const [result] serve per estrarre l'ID creato da DB AUTO_INCREMENT
    const [insertResult] = await connection.execute(
        "INSERT INTO CUSTOMER (Email, First_Name, Last_Name, Password, Phone) VALUES (?, ?, ?, ?, ?)",
      [Email, First_Name, Last_Name, passwordHash, phoneFormatted]
    ) as any; //<-- Nota: "as any" per sopprimere TS e restituire .insertID sotto
    const newUserId = insertResult.insertId;

    //LOGIN, creazione JWT
    //Nota: metodo .toString() per necessità JWT
    const userJwtPayload: User = {
        id: newUserId.toString(),
        role: "customer"
    }
    setUser (req, res, userJwtPayload);
    res.status(201).json({ message : "Successo: Registrazione effettuata con successo"})

  } catch (error) {
    console.error("Errore registerCustomer: ", error);
    res.status(500).json({ message : "Errore del Server/DB", error : error});
  }
};

