import { Request, Response } from "express";
import { connection } from "../utils/db";
import { getUser } from "../utils/auth";
import { validateUserLoggedIn, validateAdmin, errorHandler} from "../utils/auth-helpers";

export const testCustomer = async (req: Request, res: Response) => {
  try {
    const user = validateUserLoggedIn(req,res);
    const [results] = (await connection.execute(
      "SELECT Phone FROM CUSTOMER WHERE ID_Customer=?",
      [user.id]
    )) as any;
    if (!Array.isArray(results) || results.length == 0){
        res
        .status(401)
        .json({ message: "Attenzione: Utente non esistente." });
      return;
    }
    const phone = results[0].Phone;

    res.json({ id: user.id, phone: phone });
  } catch (error) {errorHandler(req,res,error)}
};

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
