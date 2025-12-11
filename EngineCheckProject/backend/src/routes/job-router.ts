import { Router } from "express";
import * as jobController from "../controllers/job-controller"

const router: Router = Router()

router.get("/api/job", jobController.allJobs)
router.get("/api/job/:id", jobController.employeeIdJobs)
router.get("/api/job/:name", jobController.customerJobs)
router.get("/api/job/:plate", jobController.licensePlateJobs)

export default router