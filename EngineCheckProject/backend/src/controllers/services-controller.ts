/*Services
Query per trovare i servizi di manutenzione
Tutti
Di Auto
Di Moto
Di Job
*/

import { Request, Response } from "express";
import { connection } from "../utils/db";

export async function allServices(req: Request, res: Response) {
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

export async function allServicesCar(req: Request, res: Response) {
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

export async function allServicesMotorcycle(req: Request, res: Response) {
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