import { Router } from "express";
import * as employeeController from "../controllers/employee-controller"

const router: Router = Router()

router.get("/api/employee", employeeController.allEmployees)
router.get("/api/employee/:id", employeeController.searchIdEmployee)
router.get("/api/employee/:name", employeeController.searchNameEmployee)

export default router