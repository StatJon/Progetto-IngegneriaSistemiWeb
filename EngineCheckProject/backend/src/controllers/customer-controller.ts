/*Customer
Query per trovare tutti i dati relativi ad un customer
Tutti i veicoli
Tutti i Job
*/

import { Request, Response } from "express";
import { connection } from "../utils/db";


export async function customerAddNewCustomer(req: Request, res: Response) {
    //Recupera dati
    const { Email, First_Name, Last_Name, Password, Phone } = req.body;
    //400: Errore campi mancanti
    if (!Email || !First_Name || !Last_Name || !Password || !Phone) {
        res.status(400).send("Compilare tutti i campi obbligatori");
        return; 
    }
    //Query SQL
    const sql = `
        INSERT INTO CUSTOMER (Email, First_Name, Last_Name, Password, Phone) 
        VALUES (?, ?, ?, ?, ?)
    `;
    //Esecuzione e risposta
    connection.execute(sql,
        [Email, First_Name, Last_Name, Password, Phone],
        function (err, result) {
            if (err) {
                // 409: Errore duplicati
                if ((err as any).code === 'ER_DUP_ENTRY') {
                    res.status(409).send("Email già registrata");
                    return;
                }
                // 500: Errori vari
                console.error("Errore inserimento cliente:", err);
                res.status(500).send({  message:"Errore Database",
                                        error: err})
                return;
            }
            //Successo
            res.status(201).send({  message: "Nuovo cliente registrato correttamente",
                                    email: Email})
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

