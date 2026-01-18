import { Router } from "express";
import * as serviceController from "../controllers/service-controller"

const router: Router = Router()

router.get("/api/service/car", serviceController.servicesCarAll)
router.get("/api/service/mootorcycle", serviceController.servicesMotorcycleAll)


export default router