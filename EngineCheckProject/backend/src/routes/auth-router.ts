import { Router } from "express";
import * as authController from "../controllers/auth-controller"

const router: Router = Router()

router.post("/api/auth/registerCustomer", authController.registerCustomer)
// post json: { Email, First_Name, Last_Name, Password, Phone }

router.post("/api/auth/loginCustomer", authController.loginCustomer)
// post json: { Email, Password }

router.post("/api/auth/loginEmployee", authController.loginEmployee)
// post json: { BadgeNumber, Password }

router.get("/api/auth/logout", authController.logout)


export default router