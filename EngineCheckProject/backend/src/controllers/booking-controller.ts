import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth.js";
import {
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateAdmin,
  errorHandler,
  validateCustomer,
} from "../utils/auth-helpers.js";
import { connection } from "../utils/db.js";

//CONFIG ORARI
const WORKDAY_START: string = "08:30";
const WORKDAY_END: string = "19:00";
const TIMESTEP_MINUTES: number = 30;

//flow booking:

//all'apertura pagina:
//--get checkDayAvailable per evidenziare i giorni non festivi
//alla selezione giorno:
//--get checkTimeAvailability per ritornare gli orari da visualizzare in menu a tendina o "giornata piena"
//alla conferma:
//--post saveBooking per INSERT in DB

//GET richiesto parametro URL /yearMonth in formato aaaa-mm es 2026-05
//Restituisce giorni disponibili per il mese in questione in formato: json({yearMonth : yyyy-mm, daysAvailable : {day : day, available : bool})
export const checkDayAvailable = async (req: Request, res: Response) => {
  try {
    //Recupero dati,
    const param = req.params.yearMonth;
    //Controllo dati, dichiarazione senza assegnazione
    let targetYear: number;
    let targetMonth: number;

    if (!param) {
      //Se non è stato passato alcun param -> default ad oggi
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const year: number = today.getFullYear();
      const month: number = today.getMonth() + 1; //<-- getMonth parte da 0
      targetYear = year;
      targetMonth = month;
    } else {
      //Se c'è param -> prepara i campi
      const targetDate: any = param.split("-");
      //Check formato corretto
      if (targetDate.length !== 2) {
        res
          .status(400)
          .json({ message: "Formato non valido, usare formato aaaa-mm" });
        return;
      }
      //Parsing string-->number: parseInt(nomeArray[index], baseNumerica(10)), check dati
      const year: number = parseInt(targetDate[0], 10);
      const month: number = parseInt(targetDate[1], 10);
      if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        res.status(400).json({ message: "Data inserita non valida" });
        return;
      }
      targetYear = year;
      targetMonth = month;
    }
    //Da qui usare: targetMonth, targetYear

    const calendarResults = []; //Elemento per stack giorni
    const daysOfMonth = new Date(targetYear, targetMonth, 0).getDate();

    /*for, pseudocode:
    Per ogni giorno del mese,
    controlla se è passato,
    controlla se è domenica (.getDay==0), 
    controlla se è festività (WIP, se c'è tempo),
    .push su calendarResults json.{day : day , available : false|true}
    */

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysOfMonth; day++) {
      let available: boolean = true; //Dichiara campo per json dopo

      const dateToCheck = new Date(targetYear, targetMonth - 1, day);
      dateToCheck.setHours(0, 0, 0, 0);

      //check giorno passato
      if (dateToCheck < today) {
        available = false;
      }

      //check domenica
      if (dateToCheck.getDay() === 0) {
        available = false;
      }

      //check festività
      //<--- DA FARE, se rimane tempo, richiede DB,CRUD,Pagina frontend --->

      calendarResults.push({
        day: day,
        available: available,
      });
    }

    const formattedTargetMonth = String(targetMonth).padStart(2, "0");
    res.status(200).json({
      yearMonth: targetYear + "-" + formattedTargetMonth,
      daysAvailable: calendarResults,
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const checkTimeAvailable = async (req: Request, res: Response) => {
  // entra GET : ?date=2026-05-15&services=1,3,4
  try {
    //CONTROLLI PRELIMINARI///
    const { date, services } = req.query;
    if (!date || !services) {
      res.status(400).json({
        message: "Attenzione: parametri date e/o services non validi o vuoti",
      });
      return;
    }
    //split + map per trasformare services in un array utilizzabile
    const paramIdServices = (services as string)
      .split(",")
      .map((service) => parseInt(service, 10));

    const [dbServices] = (await connection.execute(
      //nota: (?) invece id ? perchè si passa array
      `
      SELECT Service_ID, Estimated_Duration_Minutes
      FROM SERVICE
      WHERE Service_ID IN (?)
      `,
      [paramIdServices],
    )) as [any[], []]; //<--nota: sintassi necessaria per la struttura di dbServices

    if (paramIdServices.length !== dbServices.length) {
      //Check eventuali id mancanti
      res
        .status(400)
        .json({ message: "Attenzione, uno o più servizi inesistenti" });
      return;
    }
    let sumMinutesServices: number = 0;
    for (const service of dbServices) {
      sumMinutesServices += service.Estimated_Duration_Minutes;
    }

    ///LOGICA PRINCIPALE///
    //Usare da qui in poi sumMinutesServices e date

    /* pseudoCode:
    Creare griglia orari {orario : orario, disponibile : bool} (mezz'ore)
    Recuperare Worker massimi da DB
    Recuperare array lavori {JOB(DATE_TIME), SUM (JOB_SERVICE(SERVICE(Estimated_Duration_Minutes))) WHERE JOB(DATE(DATE_TIME)) = date } 
    Per ogni slot della griglia, controllare nell'array lavori se c'è almeno 1 worker disponibile per ogni slot necessario, segnare TRUE/FALSE nella griglia orari
    res.status(200).json(griglia orari)

    !Attenzione: manca gestione degli orari dei singoli dipendenti ed assenze (ferie/malattia)
    */

    // Preparazione: crea array timeSlots e trasforma gli orari in minuti per essere utilizzabili
    let timeSlots = [];
    const [hoursStart, minutesStart] = WORKDAY_START.split(":").map((part) =>
      parseInt(part, 10),
    );
    const startMins: number = (hoursStart || 0) * 60 + (minutesStart || 0); //calcolo con failsafe, defaulta a 0
    const [hoursEnd, minutesEnd] = WORKDAY_END.split(":").map((part) =>
      parseInt(part, 10),
    );
    const endMins: number = (hoursEnd || 0) * 60 + (minutesEnd || 0); //calcolo con failsafe, defaulta a 0

    for (let time = startMins; time < endMins; time += TIMESTEP_MINUTES) {
      const timeSlotHour: string = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const timeSlotMinutes: string = (time % 60).toString().padStart(2, "0");
      const timeSlot: string = timeSlotHour + ":" + timeSlotMinutes;
      timeSlots.push({
        timeSlot: timeSlot,
        available: true,
        timeSlotAsMinutes: time,
        busyWorkers: 0,
      });
    }

    //Calcolo lavoratori massimi disponibili
    const [workersArray] = (await connection.execute(
      `
      SELECT COUNT(*) as totalWorkers
      FROM EMPLOYEE
      WHERE Role = 'Worker'
      `,
    )) as any;
    const maxWorkers: number = workersArray[0].totalWorkers;

    //Query lista lavori per ciclo for sotto
    const [jobsArray] = (await connection.execute(
      `
      SELECT
      j.Date_Time, 
      SUM(s.Estimated_Duration_Minutes) as Total_Duration
      FROM JOB j
      JOIN JOB_SERVICE js ON j.Job_ID = js.JOB_Job_ID
      JOIN SERVICE s ON js.SERVICE_Service_ID = s.Service_ID
      WHERE DATE(j.Date_Time) = ?
      GROUP BY j.Job_ID
      `,
      [date],
    )) as any;

    //Occupazione griglia orari
    for (const job of jobsArray) {
      //Conversione a minuti per check
      const jobDate = new Date(job.Date_Time);
      const startJobMinutes = jobDate.getHours() * 60 + jobDate.getMinutes();
      const endJobMinutes = startJobMinutes + job.Total_Duration;

      //Per ogni slot controlla se il job lo occupa, +1 busyWorkers se vero
      for (const slot of timeSlots) {
        if (
          slot.timeSlotAsMinutes >= startJobMinutes &&
          slot.timeSlotAsMinutes < endJobMinutes
        ) {
          slot.busyWorkers = slot.busyWorkers + 1;
        }
      }
    }

    //Controllo disponibilità effettivo

    /*
    for (const slot of timeSlots),
     per ogni slot controlla se tutti gli slot richiesti sono liberi,
     se è vero non fare nulla (available=true di default)
     se è falso available=false e break 
    */

    let timeSlotsToFrontend = []; //{timeSlot,available}

    const timeSlotsNeeded = Math.ceil(sumMinutesServices / TIMESTEP_MINUTES); //nota: Math.ceil per evitare errori con TIMESTEP_MINUTES

    for (const slot of timeSlots) {
      //per ogni slot
      const currentIndex = timeSlots.indexOf(slot);

      for (let i = 0; i < timeSlotsNeeded; i++) {
        //per ogni slot necessario a partire dallo slot in controllo
        const nextSlot = timeSlots[currentIndex + i]; //per controllo fuori orario
        if (!nextSlot || nextSlot.busyWorkers >= maxWorkers) {
          slot.available = false;
          break;
        }
      }
      timeSlotsToFrontend.push({
        timeSlot: slot.timeSlot,
        available: slot.available,
      });
    }
    res.status(200).json(timeSlotsToFrontend);
  } catch (error) {
    errorHandler(req, res, error);
  }
};

//nota, i service da salvare vengono passati tramite url
// json {1,5,21,23}
export const saveBooking = async (req: Request, res: Response) => {
  try {
    const user = validateCustomer(req, res);
    const {
      Model,
      Vehicle_Type,
      License_Plate,
      Date_Time,
      ServicesArray,
    } = req.body;

    //Controllo campi
    if (
      !Model ||
      !Vehicle_Type ||
      !License_Plate ||
      !Date_Time ||
      !user.id
    ) {
      res.status(400).json({ message: "Attenzione: Compilare tutti i campi" });
      return;
    }
    if (!(Array.isArray(ServicesArray) && ServicesArray.length > 0)) {
      res.status(400).json({ message: "Attenzione: Servizi mancanti" });
      return;
    }

    //INSERT in JOB
    const [newJob] = (await connection.execute(
      `
        INSERT INTO JOB
        (Model, Vehicle_Type, License_Plate, Date_Time, CUSTOMER_ID) VALUES
        (?,?,?,?,?)
        `,
      [Model, Vehicle_Type, License_Plate, Date_Time, user.id],
    )) as any;
    const newJobId = newJob.insertId;

    //INSERT IN JOB_SERVICE
    for (const service of ServicesArray) {
      await connection.execute(
        `
        INSERT INTO JOB_SERVICE
        (JOB_Job_ID, SERVICE_Service_ID) VALUES
        (?,?)
        `,
        [newJobId, service],
      );
    }
    res.status(201).json({ message: "Prenotazione Confermata" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};
