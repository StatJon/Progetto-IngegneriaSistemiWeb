/*Customer
Query per trovare tutti i dati relativi ad un customer
Tutti i veicoli
Tutti i Job
*/

import { Request, Response } from "express";
import { connection } from "../utils/db";

/* Template
export async function nomeFunzione(req: Request, res: Response) {
    connection.execute(
        `SELECT
        FROM
        WHERE`,
        [],
        function (err, results, fields) {
            res.json(results)
        }
    )    
}
*/