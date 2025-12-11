/*Employee
Query per trovare gli employee
Tutti
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