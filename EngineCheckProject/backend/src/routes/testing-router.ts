import { Router } from "express";
import * as testingRouter from "../controllers/testing-controller"

const router: Router = Router()

router.get("/api/testing",testingRouter.testingJson)

export default router

