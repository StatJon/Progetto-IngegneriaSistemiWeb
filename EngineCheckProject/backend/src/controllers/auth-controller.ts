import bcrypt from "bcrypt";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Request, Response } from "express";
import { blockIfLoggedIn, getUser, setUser, unsetUser, User } from "../utils/auth";
import { onServerErrorHandled, connection } from "../utils/db";

///REGISTER///
export const registerCustomer = async (req: Request, res: Response) => {
  if (blockIfLoggedIn(req, res)){
    return;
  }
  //Recupera dati
  const { Email, First_Name, Last_Name, Password, Phone } = req.body;
  //400: Errore campi mancanti
  if (!Email || !First_Name || !Last_Name || !Password || !Phone) {
    res.status(400).json({ message: "Compilare tutti i campi obbligatori" });
    return;
  }
  //Controlla email già esistente
  connection.execute(
    "SELECT Email FROM CUSTOMER WHERE Email=?",
    [Email],
    onServerErrorHandled (res, async (results) => {

      if (Array.isArray(results) && results.length > 0) {
        res.status(400).send("Account già esistente con questa email");
        return;
      }

      //Validazione campo "Phone" tramite libreria "awesome-phonenumber"
      const phoneParser = parsePhoneNumber(Phone, { regionCode: "IT" });
      if (!phoneParser.valid) {
        res.status(400).send({ message: "Numero di telefono non valido" });
        return;
      }
      const phoneFormatted = phoneParser.number?.e164; //usare PhoneFormatted da qui in poi

      //Hashing password
      const passwordHash = await bcrypt.hash(Password, 10);

      //Inserimento dati validati
      connection.execute(
        "INSERT INTO CUSTOMER (Email, First_Name, Last_Name, Password, Phone) VALUES (?, ?, ?, ?, ?)",
        [Email, First_Name, Last_Name, passwordHash, phoneFormatted],
        (errInsert, resInsert) => {
          if (errInsert) {
            res.status(500).send("Errore Server: " + errInsert);
            return;
          }
          //Preparazione interfaccia JWT
          const userJwtPayload: User = {
            id: Email,
            role: "customer"
          };
          //Creazione JWT cookie
          setUser(req, res, userJwtPayload);
          //201
          res.status(201).send("Registrazione effettuata!")
        }
      );
    })
  );
}; 
///FINE REGISTER///


//LOGIN
export const loginCustomer = async (req: Request, res: Response) => {
    
}


//PROFILE

//LOGOUT

