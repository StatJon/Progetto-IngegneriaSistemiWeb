import { Router } from "express";
import * as bookingController from "../controllers/booking-controller"

const router: Router = Router()

router.get("/api/booking/checkDayAvailable/:yearMonth", bookingController.checkDayAvailable);
/*
Richiede: GET: yearMonth, in formato aaaa-mm, ad esempio 2026-03, se lasciato vuoto defaulta ad oggi
Ritorna : JSON annidato ({yearMonth : yyyy-mm, daysAvailable : {day : day, available : bool})
Per ogni giorno del mese, controlla se è giorno lavorativo
Nota: da inviare all'apertura della pagina (default ad oggi) e al cambio di mese selezionato nel calendario
*/

router.get("/api/booking/checkTimeAvailable", bookingController.checkTimeAvailable)
/*
Richiede: GET: ?date=aaaa-mm-gg&services=1,2,3,...
Ritorna : JSON ({timeSlot : hh:mm, available : true/false})
Per il giorno selezionato, verifica in quali orari è possibile prenotare il lavoro composto dai servizi richiesti
Nota: anche se nel controller non c'è scritto, appendere i parametri scritti in "Richiede: GET:"
*/

router.post("/api/booking/saveBooking", bookingController.saveBooking)
/*
Richiede: POST JSON {Model, Vehicle_Type, License_Plate, Date_Time, Customer_ID, ServicesArray,}
Ritorna : Messaggio di conferma
Salva i dati della prenotazione nel DB
*/
export default router