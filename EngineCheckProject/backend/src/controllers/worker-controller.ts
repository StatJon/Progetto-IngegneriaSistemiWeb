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
        soj.JobService_Status,
        j.Model,
        j.Vehicle_Type,
        j.License_Plate,
        j.Date_Time,
        s.Title,
        s.Description,
        s.Estimated_Duration_Minutes,
        e.First_Name,
        e.Last_Name,
        c.Email,
        c.Phone

        FROM JOB AS j

        LEFT JOIN SERVICES_OF_JOB AS soj ON j.Job_ID = soj.JOB_Job_ID
        LEFT JOIN SERVICE AS s ON soj.SERVICE_Service_ID = s.Service_ID

        LEFT JOIN EMPLOYEE_OF_JOB AS eoj ON j.Job_ID = eoj.JOB_Job_ID
        LEFT JOIN EMPLOYEE AS e ON eoj.EMPLOYEE_Badge_Number = e.ID_Badge_Number

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
        soj.JobService_Status,
        j.Model,
        j.Vehicle_Type,
        j.License_Plate,
        j.Date_Time,
        s.Title,
        s.Description,
        s.Estimated_Duration_Minutes,
        c.Email,
        c.Phone

        j.Job_ID,
        j.Model,
        j.Vehicle_Type,
        j.License_Plate,
        j.Date_Time,
        soj.JobService_Status,
        s.Title,
        s.Description,
        s.Estimated_Duration_Minutes,
        c.Email,
        c.Phone

        FROM JOB AS j

        LEFT JOIN SERVICES_OF_JOB AS soj ON j.Job_ID = soj.JOB_Job_ID
        LEFT JOIN SERVICE AS s ON soj.SERVICE_Service_ID = s.Service_ID

        LEFT JOIN EMPLOYEE_OF_JOB AS eoj ON j.Job_ID = eoj.JOB_Job_ID
        LEFT JOIN EMPLOYEE AS e ON eoj.EMPLOYEE_Badge_Number = e.ID_Badge_Number

        LEFT JOIN CUSTOMER AS c ON j.CUSTOMER_ID = c.ID_Customer

        WHERE 
        (e.ID_Badge_Number = ? OR e.ID_Badge_Number IS NULL)
        AND 
        (j.Job_Status IN ('Pending', 'Assigned', 'Working'))
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


export const setJobStatus = async (req: Request, res: Response) => {
  try{
    const user = validateEmployee;
    const {Job_ID, Service_ID, Job_Status} = req.body;
    await connection.execute(
      `
      UPDATE JOB
      `
    )

  }catch (error){
    errorHandler(req,res,error)
  }
};