import { Router } from "express";
import * as bookingController from "../controllers/booking-controller"

const router: Router = Router()

router.get("/api/booking/checkDayAvailable/:yearMonth?", bookingController.checkDayAvailable);
/*
Richiede: GET: yearMonth, in formato aaaa-mm, ad esempio 2026-03, se lasciato vuoto defaulta ad oggi
Ritorna : JSON annidato ({yearMonth : yyyy-mm, daysAvailable : {day : day, available : bool})
Per ogni giorno del mese, controlla se è giorno lavorativo
Nota: da inviare all'apertura della pagina (default ad oggi) e al cambio di mese selezionato nel calendario
*/

router.post("/api/booking/checkTimeAvailable", bookingController.checkTimeAvailable)
/*
WIP
*/

router.post("/api/booking/saveBooking", bookingController.saveBooking)
/*
Richiede: POST JSON {Model, Vehicle_Type, License_Plate, Date_Time, Customer_ID, ServicesArray,}
Ritorna : WIP
Salva i dati della prenotazione nel DB
*/
export default router