import { Router } from "express";
import * as authController from "../controllers/auth-controller"

const router: Router = Router()

router.post("/api/auth/registerCustomer", authController.registerCustomer)

export default router