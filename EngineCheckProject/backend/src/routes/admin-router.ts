import { Router } from "express";
import * as adminController from "../controllers/admin-controller"

const router: Router = Router()

router.get("/api/admin/employeesList", adminController.listAllEmployees)

router.post("/api/admin/registerEmployee", adminController.registerEmployee)
//post json: { First_Name, Last_Name, Password }
router.post("/api/admin/removeEmployee", adminController.removeEmployee)
//post json: { ID_Badge_Number }



//router.post("/api/customer/addNew", customerController.customerAddNewCustomer)
//router.get("/api/customer/allVehicles", customerController.customerAllJobs)

export default router