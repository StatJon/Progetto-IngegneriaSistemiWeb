import { Router } from "express";
import * as adminController from "../controllers/admin-controller"

const router: Router = Router()

//
//IMPORTANTE: tutte le API in questo file richiedono cookie Admin
//

router.get("/api/admin/listAllEmployees", adminController.listAllEmployees)
/*
Richiede: nulla
Ritorna : JSON {ID_Badge_Number, First_Name, Last_Name, Role}
Elenca tutti i dipendenti, per pagina tabella dipendenti
*/

router.post("/api/admin/registerEmployee", adminController.registerEmployee)
/*
Richiede: POST JSON { First_Name, Last_Name, Password }
Ritorna : JSON { message, first_name, last_name}
//Inserisce un nuovo employee in DB
*/

router.post("/api/admin/removeEmployee", adminController.removeEmployee)
/*
Richiede: POST JSON { ID_Badge_Number }
Ritorna : JSON { message, badge, first_name, last_name }
Rimuove un dipendente settando il suo 'Role' ad 'Inactive', rende il suo token inutilizzabile ma rimane in DB
Nota: non può rimuovere utenti Admin
*/

export default router