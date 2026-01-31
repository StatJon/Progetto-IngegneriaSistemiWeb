import { Router } from "express";
import * as customerController from "../controllers/customer-controller.js"

const router: Router = Router()

router.get("/api/customer/customerPage", customerController.customerPage)
/*
Richiede: JWT Cliente
Ritorna : JSON : ({ Date, Time, Model, License_Plaete, Services})
Necessario per pagina utente di overview dei lavori prenotati
*/

router.get("/api/customer/jobDetails/:jobId", customerController.jobDetails)
/*
Richiede: GET: jobId da cercare, JWT Cliente
Ritorna : JSON : ({Date, Time, Model, License_Plate, ID_Customer, Services})
Elenca tutti i dettagli di un job specifico
*/

router.delete("/api/customer/jobDelete/:jobId", customerController.jobDelete)
/*
Richiede: GET: jonId da eliminare, JWT Cliente
Ritorna : Conferma di eliminazione
Elimina il Job specificato
*/

export default router