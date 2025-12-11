import { Router } from "express";
import * as customerController from "../controllers/customer-controller"

const router: Router = Router()

router.get("/api/customer/allVehicles", customerController.customerAllVehicles)

export default router