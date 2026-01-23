import { Router } from "express";
import * as serviceController from "../controllers/service-controller"

const router: Router = Router()

//Nota: API per pagine selezione servizi da prenotare

router.get("/api/service/car", serviceController.servicesCarAll)
/*
Richiede: Nulla
Ritorna: {Service_ID, Minutes, Title, Description, Price, Category}
Per videata selezione servizi auto
*/

router.get("/api/service/mootorcycle", serviceController.servicesMotorcycleAll)
/*
Richiede: Nulla
Ritorna: {Service_ID, Minutes, Title, Description, Price, Category}
Per videata selezione servizi moto
*/

export default router