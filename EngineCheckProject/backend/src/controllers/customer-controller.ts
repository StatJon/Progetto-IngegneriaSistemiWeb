import { Request, Response } from "express";
import { connection } from "../utils/db";
import { getUser } from "../utils/auth";
import { validateUserLoggedIn, validateAdmin, errorHandler} from "../utils/auth-helpers";



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
