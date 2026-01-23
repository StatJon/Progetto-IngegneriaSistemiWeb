import { Router } from "express";
import * as authController from "../controllers/auth-controller"

const router: Router = Router()

router.post("/api/auth/registerCustomer", authController.registerCustomer)
/*
Richiede: POST: JSON : { Email, First_Name, Last_Name, Password, Phone }
Ritorna: Assegna JWT Token, messaggio di conferma
*/

router.post("/api/auth/loginCustomer", authController.loginCustomer)
/*
Richiede: POST: JSON: { Email, Password }
Ritorna: Assegna JWT Token, messaggio di conferma
*/
// post json: 

router.post("/api/auth/loginEmployee", authController.loginEmployee)
/*
Richiede: POST: JSON: { BadgeNumber, Password }
Ritorna: Assegna JWT Token, messaggio di conferma
Nota: Nel JWT viene inserito anche il ruolo worker/admin automaticamente
*/

router.get("/api/auth/logout", authController.logout)
/*
Richiede: Nulla
Ritorna: Rimuove JWT, se c'è, messaggio di conferma
*/


export default router