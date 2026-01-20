import { Router } from "express";
import * as jobController from "../controllers/job-controller"

const router: Router = Router()

router.get("/api/job/listAllJobs",jobController.listAllJobs);
//Query Generale, per Admin

router.get("/api/job/listEmployeeJobs",jobController.listEmployeeJobs);
//Query per Employee, elenca i jobs assegnati e i non assegnati in generale

router.post("/api/job/setStatusJobService",jobController.setStatusJobService);
//post json: {Job_ID, Service_ID, Job_Status} dove Job_Status deve essere uno di : 'Pending', 'Assigned', 'Working', 'Completed', 'Cancelled'

router.post("/api/job/setEmployeeJobService",jobController.setEmployeeJobService)
//post json: {Job_ID, Service_ID} nota: il numero di badge viene recuperato in automatico dal cookie


export default router