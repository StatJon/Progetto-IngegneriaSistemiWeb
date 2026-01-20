import { Router } from "express";
import * as adminController from "../controllers/admin-controller"

const router: Router = Router()

//Nota generale: tutte le API in questo file richiedono cookie Admin

router.get("/api/admin/listAllEmployees", adminController.listAllEmployees)

router.post("/api/admin/registerEmployee", adminController.registerEmployee)
//post json: { First_Name, Last_Name, Password }

router.post("/api/admin/removeEmployee", adminController.removeEmployee)
//post json: { ID_Badge_Number }

export default router