import { Router } from "express";
import * as authController from "../controllers/auth-controller.js"

const router: Router = Router()

router.post("/api/auth/registerCustomer", authController.registerCustomer)
/*
Richiede: POST: JSON : { Email, First_Name, Last_Name, Password, Phone }
Ritorna: Assegna JWT Token, messaggio di conferma
*/

router.post("/api/auth/loginCustomer", authController.loginCustomer)
/*
Richiede: POST: JSON: { Email, Password }
Ritorna: Assegna JWT Token, JSON {"Successo: Login Ok", firstName, lastName}
*/

router.post("/api/auth/loginEmployee", authController.loginEmployee)
/*
Richiede: POST: JSON: { BadgeNumber, Password }
Ritorna: Assegna JWT Token, JSON {"Successo: Login Ok", firstName, lastName, badgeNumber}
Nota: Nel JWT viene inserito anche il ruolo worker/admin automaticamente
*/

router.get("/api/auth/whoami", authController.whoami)
/*
Richiede: Utente loggato, JWT
Ritorna: JSON { role }
Necessario quando il frontend deve conoscere il ruolo dell'utente per accedere a pagina utente/lavori/admin
*/

router.get("/api/auth/whoamiCustomer", authController.whoamiCustomer)
/*
Richiede: Utente loggato, JWT
Ritorna: JSON { id }
Necessario quando il frontend deve conoscere il Customer_ID dell'utente per accedere ai propri lavori
*/

router.get("/api/auth/logout", authController.logout)
/*
Richiede: Nulla
Ritorna: Rimuove JWT, se c'è, messaggio di conferma
*/


export default router