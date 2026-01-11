import bcrypt from "bcrypt";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import { connection } from "../utils/db";

//REGISTER

export const registerCustomer = async (req: Request, res: Response) => {
  //controllo login gia eseguito, !: verificare se mantenere a controller ultimato
  const user = getUser(req, res);
  if (user) {
    res.status(401).send("Questa operazione richiede il logout.");
    return;
  }
  //Recupera dati
  const { Email, First_Name, Last_Name, Password, Phone } = req.body;
  //400: Errore campi mancanti
  if (!Email || !First_Name || !Last_Name || !Password || !Phone) {
    res.status(400).send({ message: "Compilare tutti i campi obbligatori" });
    return;
  }
  //Controlla email già esistente
  const [emails] = await connection.execute("SELECT Email FROM CUSTOMER WHERE Email=?", [
    Email,
  ])
    if (Array.isArray(emails) && emails.length > 0) {
    res.status(400).send("Username già in uso.")
    return
  }

  //Validazione campo "Phone" tramite libreria "awesome-phonenumber"
  const phoneParser = parsePhoneNumber(Phone, { regionCode: "IT" });
  if (!phoneParser.valid) {
    res.status(400).send({ message: "Numero di telefono non valido" });
  }
  const PhoneFormatted = phoneParser.number?.e164; //usare PhoneFormatted da qui in poi
};
//LOGIN

//PROFILE

//LOGOUT

//SECURE API
