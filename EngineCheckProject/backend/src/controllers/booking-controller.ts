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

export const checkTimeDateAvailability = async (req: Request, res: Response) => {
    
}


//nota, i service da salvare vengono passati tramite url
// json {1,5,21,23}
export const saveBooking = async (req: Request, res: Response) => {
  try {
    const user = validateCustomer(req, res);
    const { Model, Vehicle_Type, License_Plate, Date_Time, Customer_ID, ServicesArray,} = req.body;

    //Controllo campi
    if ( !Model || !Vehicle_Type || !License_Plate || !Date_Time || !Customer_ID ) {
      res.status(400).json({ message: "Attenzione: Compilare tutti i campi" });
      return;
    }
    if (!(Array.isArray(ServicesArray) && ServicesArray.length > 0)) {
      res.status(400).json({ message: "Attenzione: Servizi mancanti" });
      return;
    }

    //INSERT in JOB
    const [newJob] = (await connection.execute(
      `
        INSERT INTO JOB
        (Model, Vehicle_Type, License_Plate, Date_Time, CUSTOMER_ID) VALUES
        (?,?,?,?,?)
        `,
      [Model, Vehicle_Type, License_Plate, Date_Time, Customer_ID],
    )) as any;
    const newJobId = newJob.insertId;

    //INSERT IN JOB_SERVICE
    for (const service of ServicesArray) {
      await connection.execute(
        `
        INSERT INTO JOB_SERVICE
        (JOB_Job_ID, SERVICE_Service_ID) VALUES
        (?,?)
        `,
        [newJobId, service],
      );
    }
    res.status(200).json({message : "Prenotazione Confermata"})
  } catch (error) {
    errorHandler(req, res, error);
  }
};
