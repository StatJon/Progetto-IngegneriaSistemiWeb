/*Employee
Query per trovare gli employee
Tutti
N.Badge
Nome Cognome
*/

import { Request, Response } from "express";
import { connection } from "../utils/db";


export async function allEmployees(req: Request, res: Response) {
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

export async function searchIdEmployee(req: Request, res: Response) {
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
export async function searchNameEmployee(req: Request, res: Response) {
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