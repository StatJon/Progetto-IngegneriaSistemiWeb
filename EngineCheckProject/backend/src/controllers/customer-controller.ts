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

}catch(error){errorHandler(req,res,error)}
}

export const jobDetails = async (req: Request, res: Response) => {
try{

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
