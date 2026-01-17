import { Router } from "express";
import * as customerController from "../controllers/customer-controller"

const router: Router = Router()

router.get("api/customer/test", customerController.testCustomer)


//router.post("/api/customer/addNew", customerController.customerAddNewCustomer)
//router.get("/api/customer/allVehicles", customerController.customerAllJobs)

export default router