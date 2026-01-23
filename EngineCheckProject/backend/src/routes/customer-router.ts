import { Router } from "express";
import * as customerController from "../controllers/customer-controller"

const router: Router = Router()

router.get("/api/customer/customerPage", customerController.customerPage)

router.get("/api/customer/jobDetails", customerController.jobDetails)

router.get("/api/customer/jobDelete", customerController.jobDelete)

export default router