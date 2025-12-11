import { Router } from "express";
import * as serviceController from "../controllers/service-controller"

const router: Router = Router()

router.get("/api/service", serviceController.allServices)
router.get("/api/service/car", serviceController.allServicesCar)
router.get("/api/service/motorcycle", serviceController.allServicesMotorcycle)
router.get("/api/service/:id", serviceController.servicesJob)

export default router