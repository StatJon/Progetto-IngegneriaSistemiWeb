import { Router } from "express";
import * as adminController from "../controllers/admin-controller"

const router: Router = Router()

//
//IMPORTANTE: tutte le API in questo file richiedono cookie Admin
//

router.get("/api/admin/listAllEmployees", adminController.listAllEmployees)
//Elenca tutti i dipendenti, per pagina tabella dipendenti

router.post("/api/admin/registerEmployee", adminController.registerEmployee)
//Per form registrazione nuovo dipendente
//post json: { First_Name, Last_Name, Password }


router.post("/api/admin/removeEmployee", adminController.removeEmployee)
//Per cancellazione dipendente, richiede numero di badge da cancellare, non può cancellare utenti Admin
//Nota: non cancella dal DB, imposta il ruolo del dipendente a 'Inactive' rendendo inutile il cookie del dipendente
//post json: { ID_Badge_Number }

export default router