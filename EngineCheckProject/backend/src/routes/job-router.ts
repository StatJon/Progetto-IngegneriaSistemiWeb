import { Router } from "express";
import * as jobController from "../controllers/job-controller"

const router: Router = Router()

router.get("/api/job/listAllJobs",jobController.listAllJobs);
/*
Richiede: JWT Admin
Ritorna: JSON { Job_ID, Service_ID, JobService_Status, JobService_Status, Model, Vehicle_Type, License_Plate, Date_Time, Title, Description, Minutes, Worker_Name, Worker_Last_Name, Customer_Email, Customer_Phone }
Query Generale di tutti i lavori, per Admin
*/

router.get("/api/job/listEmployeeJobs",jobController.listEmployeeJobs);
/*
Richiede: JWT Worker
Ritorna: JSON: { Job_ID, Service_ID, JobService_Status, Model, Vehicle_Type, License_Plate, Date_Time, Title, Description, Minutes, CustomerEmail, CustomerPhone }
Query per Employee, elenca i jobs ad egli/ella assegnati e i non assegnati a nessuno
*/

router.post("/api/job/setStatusJobService",jobController.setStatusJobService);
/*
Richiede: JWT Worker, POST JSON: {Job_ID, Service_ID, Job_Status}
Ritorna: Messaggio di conferma
Imposta lo status di un Job a Job_Status (deve essere uno tra 'Pending', 'Assigned', 'Working', 'Completed', 'Cancelled' )
*/


router.post("/api/job/setEmployeeJobService",jobController.setEmployeeJobService) //possibile refactor a GET
/*
Richiede: JWT Worker, POST: JSON: {Job_ID, Service_ID}
Ritorna: Messaggio di conferma
Imposta il worker come assegnato al Job_ID passato (deduce il badge del worker dal JWT)
*/

