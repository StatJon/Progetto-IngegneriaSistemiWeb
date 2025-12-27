/*Customer
Query per trovare tutti i dati relativi ad un customer
Tutti i veicoli
Tutti i Job
*/

import { Request, Response } from "express";
import { connection } from "../utils/db";
import { parsePhoneNumber } from "awesome-phonenumber";

// NOTA: i .send inviano sempre dei JSON per coerenza tra messaggi semplici e con più argomenti

export async function customerAddNewCustomer(req: Request, res: Response) {
    //Recupera dati
    const { Email, First_Name, Last_Name, Password, Phone } = req.body;
    //400: Errore campi mancanti
    if (!Email || !First_Name || !Last_Name || !Password || !Phone) {
        res.status(400).send({ message: "Compilare tutti i campi obbligatori" });
        return; 
    }

    //Validazione campo "Phone" tramite libreria "awesome-phonenumber"
    const phoneParser = parsePhoneNumber(Phone, {regionCode: 'IT'})
    if (!phoneParser.valid) {
        res.status(400).send({  message: "Numero di telefono non valido"
                                })
    }
    const PhoneFormatted = phoneParser.number?.e164;


    //Query SQL
    const sql = `
        INSERT INTO CUSTOMER (Email, First_Name, Last_Name, Password, Phone) 
        VALUES (?, ?, ?, ?, ?)
    `;
    //Esecuzione e risposta
    connection.execute(sql,
        [Email, First_Name, Last_Name, Password, PhoneFormatted],
        function (err, result) {
            if (err) {
                // 409: Errore duplicati
                if ((err as any).code === 'ER_DUP_ENTRY') {
                    res.status(409).send({ message: "Email già registrata" });
                    return;
                }
                // 500: Errori vari
                console.error("Errore inserimento cliente:", err);
                res.status(500).send({  message:"Errore Database",
                                        error: err.message})
                return;
            }
            //Successo
            res.status(201).send({  message: "Nuovo cliente registrato correttamente",
                                    email: Email,
                                    phone: PhoneFormatted})
        }
    );
}


export async function customerAllVehicles(req: Request, res: Response) {
    connection.execute(
        `SELECT
        FROM
        WHERE`,
        [],
        function (err, results, fields) {
            res.json(results);
        }
    );
}

