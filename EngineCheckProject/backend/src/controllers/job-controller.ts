/*Jobs
Query per trovare lavori da svolgere
Tutti
Di Employee
Di Customer
Di Vechicle_Plate
*/

import { Request, Response } from "express";
import { connection } from "../utils/db";

export async function allJobs(req: Request, res: Response) {
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

export async function employeeIdJobs(req: Request, res: Response) {
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

export async function customerJobs(req: Request, res: Response) {
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

export async function licensePlateJobs(req: Request, res: Response) {
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