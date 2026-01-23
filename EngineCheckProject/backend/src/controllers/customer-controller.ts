import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import {
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateAdmin,
  errorHandler,
  validateCustomer,
} from "../utils/auth-helpers";
import { connection } from "../utils/db";

export const customerPage = async (req: Request, res: Response) => {
try{
    const user = validateCustomer(req,res);
    const [results] = await connection.execute(
        `
        SELECT 
        DATE(j.Date_Time) AS Date,
        TIME(j.Date_Time) AS Time,
        j.Model,
        j.License_Plate,
        GROUP_CONCAT(s.Title SEPARATOR ', ') AS Services
        FROM JOB j
        JOIN JOB_SERVICE js ON j.Job_ID = js.JOB_Job_ID
        JOIN SERVICE s ON s.Service_ID = js.SERVICE_Service_ID
        WHERE j.CUSTOMER_ID = ?
        `,
        [user.id]
    );
    if (!Array.isArray(results) || results.length == 0){
        res
        .status(401)
        .json({ message: "Nessun servizio prenotato." });
      return;
    }
    res.status(200).json(results);

}catch(error){errorHandler(req,res,error)}
}

export const jobDetails = async (req: Request, res: Response) => {
try{
    const user = validateCustomer(req,res);
    const [results] = await connection.execute(
        `
        SELECT 
        DATE(j.Date_Time) AS Date,
        TIME(j.Date_Time) AS Time,
        j.Model,
        j.License_Plate,
        s.Title,
        c.ID_Customer
        FROM JOB j
        JOIN JOB_SERVICE js ON j.Job_ID = js.JOB_Job_ID
        JOIN SERVICE s ON s.Service_ID = js.SERVICE_Service_ID
        JOIN CUSTOMER c ON j.CUSTOMER_ID = c.ID_Customer
        WHERE j.Job_ID = ?
        `,
        [req.params.jobId]
    ) as any;
    if (results[0].ID_Customer !== user.id){
        res.status(400).json({ message: "Errore: Utente errato" });
      return;
    };

    //Trasformare da [results] ad un JSON utilizzabile

    res.status(200).json(results);//CAMBIARE results
}catch(error){errorHandler(req,res,error)}
}

export const jobDelete = async (req: Request, res: Response) => {
try{

}catch(error){errorHandler(req,res,error)}
}

/*Email -> JOBs -for_each-> SERVICES_OF_JOBs -for_each-> SERVICE_Service_ID */
/*
export async function customerAllJobs(req: Request, res: Response) {
    connection.execute(
        `
SELECT *
FROM CUSTOMER as c 
INNER JOIN JOB as j 
ON c.Email = j.CUSTOMER_Email
LEFT JOIN SERVICES_OF_JOB as sj 
ON j.Job_ID = sj.JOB_Job_ID
LEFT JOIN SERVICE as s 
ON sj.SERVICE_Service_ID = s.Service_ID
`,
        [],
        function (err, results, fields) {
            res.json(results);
        }
    );
}
*/
