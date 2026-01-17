import { Router } from "express";
import * as authController from "../controllers/auth-controller"

const router: Router = Router()

router.post("/api/auth/registerCustomer", authController.registerCustomer)
router.post("/api/auth/loginCustomer", authController.loginCustomer)
router.post("/api/auth/loginEmployee", authController.loginEmployee)
router.post("/api/auth/logout", authController.registerCustomer)


export default router