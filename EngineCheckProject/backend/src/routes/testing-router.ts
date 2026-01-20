import { Router } from "express";
import * as testingRouter from "../controllers/testing-controller"

const router: Router = Router()

router.get("/api/testing",testingRouter.testingJson)
//Test comunicazione semplice verso backend

router.get("/api/customer/test", testingRouter.testCustomer)
//Test cookie, auth, sql

export default router

