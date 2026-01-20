import { Router } from "express";
import * as testingRouter from "../controllers/testing-controller"

const router: Router = Router()

router.get("/api/testing",testingRouter.testingJson)
router.get("/api/customer/test", testingRouter.testCustomer)

export default router

