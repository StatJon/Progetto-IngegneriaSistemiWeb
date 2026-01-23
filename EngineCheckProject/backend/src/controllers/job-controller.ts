import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import {
  validateUserLoggedIn,
  validateAdmin,
  errorHandler,
  validateEmployee,
} from "../utils/auth-helpers";
import { connection } from "../utils/db";

//Query Generale, per Admin
export const listAllJobs = async (req: Request, res: Response) => {
  try {
    validateAdmin(req, res);
    const [results] = await connection.execute(
      `
        SELECT 
        j.Job_ID,
        s.Service_ID,
        sj.JobService_Status,
        j.Model,
        j.Vehicle_Type,
        j.License_Plate,
        j.Date_Time,
        s.Title as Service, 
        s.Description,
        s.Estimated_Duration_Minutes, as Minutes
        e.First_Name, as Worker_Name
        e.Last_Name, as Worker_Last_Name
        c.Email, as Customer_Email
        c.Phone as Customer_Phone

        FROM JOB AS j

        LEFT JOIN JOB_SERVICE AS sj ON j.Job_ID = sj.JOB_Job_ID
        LEFT JOIN SERVICE AS s ON sj.SERVICE_Service_ID = s.Service_ID
        LEFT JOIN EMPLOYEE AS e ON sj.EMPLOYEE_Badge_Number = e.ID_Badge_Number
        LEFT JOIN CUSTOMER AS c ON j.CUSTOMER_ID = c.ID_Customer
        `,
    );
    if (!Array.isArray(results) || results.length == 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(results);
  } catch (error) {
    errorHandler(req, res, error);
  }
};
//Query per Employee, elenca i jobs assegnati e i non assegnati in generale
export const listEmployeeJobs = async (req: Request, res: Response) => {
  try {
    const user = validateEmployee(req, res);
    const [results] = await connection.execute(
      `
        SELECT 

        j.Job_ID,
        s.Service_ID,
        sj.JobService_Status,
        j.Model,
        j.Vehicle_Type,
        j.License_Plate,
        j.Date_Time,
        s.Title,
        s.Description,
        s.Estimated_Duration_Minutes as Minutes,
        c.Email as CustomerEmail,
        c.Phone as CustomerPhone

        FROM JOB AS j

        LEFT JOIN JOB_SERVICE AS sj ON j.Job_ID = sj.JOB_Job_ID
        LEFT JOIN SERVICE AS s ON sj.SERVICE_Service_ID = s.Service_ID
        LEFT JOIN EMPLOYEE AS e ON sj.EMPLOYEE_Badge_Number = e.ID_Badge_Number
        LEFT JOIN CUSTOMER AS c ON j.CUSTOMER_ID = c.ID_Customer

        WHERE 
        (e.ID_Badge_Number = ? OR e.ID_Badge_Number IS NULL)
        AND 
        (sj.JobService_Status IN ('Pending', 'Assigned', 'Working'))
        `,
      [user.id],
    );
    if (!Array.isArray(results) || results.length == 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(results);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const setStatusJobService = async (req: Request, res: Response) => {
  try{
    const user = validateEmployee(req,res);
    const {Job_ID, Service_ID, Job_Status} = req.body;
    await connection.execute(
      `
      UPDATE JOB_SERVICE
      SET JobService_Status = ?
      WHERE JOB_Job_ID = ?
      AND SERVICE_Service_ID = ?
      `,
      [Job_Status, Job_ID, Service_ID]
    );
    res.status(200).json({ message : "Lavoro " + Job_ID + "." + Service_ID + "impostato a " + Job_Status});
  }catch (error){
    errorHandler(req,res,error)
  }
};

export const setEmployeeJobService = async (req: Request, res: Response) => {
  try{
    const user = validateEmployee(req,res);
    const {Job_ID, Service_ID} = req.body;
    await connection.execute(`
      UPDATE JOB_SERVICE

      SET 
      JobService_Status  = ?,
      EMPLOYEE_Badge_Number = ?

      WHERE JOB_Job_ID = ?
      AND SERVICE_Service_ID = ?
      `,
    ['Assigned',user.id, Job_ID, Service_ID]
  );
  res.status(200).json({ message : "Lavoro " + Job_ID + "." + Service_ID + "assegnato a " + user.id })

  }catch (error){errorHandler(req,res,error)}
};