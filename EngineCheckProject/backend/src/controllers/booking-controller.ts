import { Request, Response } from "express";
import { errorHandler, validateCustomer } from "../utils/auth-helpers.js";
import { connection } from "../utils/db.js";

//CONFIG ORARI
const WORKDAY_START: string = "08:30";
const WORKDAY_END: string = "19:00";
const TIMESTEP_MINUTES: number = 30;

export const checkDayAvailable = async (req: Request, res: Response) => {
  try {
    //Recupero dati,
    const param = req.params.yearMonth;
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
      const targetDate: any = param.split("-");
      if (targetDate.length !== 2) {
        res
          .status(400)
          .json({ message: "Formato non valido, usare formato aaaa-mm" });
        return;
      }
      //Parsing e check
      const year: number = parseInt(targetDate[0], 10);
      const month: number = parseInt(targetDate[1], 10);
      if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        res.status(400).json({ message: "Data inserita non valida" });
        return;
      }
      targetYear = year;
      targetMonth = month;
    }
    const calendarResults = []; //Elemento per stack giorni
    const daysOfMonth = new Date(targetYear, targetMonth, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //Controllo giorni non prenotabili
    for (let day = 1; day <= daysOfMonth; day++) {
      let available: boolean = true;
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
      //Check non incluso richiede troppo tempo, (richiede DB,CRUD,Pagina frontend)
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
  try {
    //Controlli preliminari
    const { date, services } = req.query;
    if (!date || !services) {
      res.status(400).json({
        message: "Attenzione: parametri date e/o services non validi o vuoti",
      });
      return;
    }
    const paramIdServices = (services as string)
      .split(",")
      .map((service) => parseInt(service, 10));
    const placeholders = paramIdServices.map(() => "?").join(", ");

    const [dbServices] = (await connection.execute(
      `
      SELECT Service_ID, Estimated_Duration_Minutes
      FROM SERVICE
      WHERE Service_ID IN (${placeholders})
      `,
      paramIdServices,
    )) as [any[], []];

    if (paramIdServices.length !== dbServices.length) {
      res
        .status(400)
        .json({ message: "Attenzione, uno o più servizi inesistenti" });
      return;
    }
    let sumMinutesServices: number = 0;
    for (const service of dbServices) {
      sumMinutesServices += service.Estimated_Duration_Minutes;
    }

    //Calcolo timeslots
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

    //Blocca ore passate
    const todayDate = new Date();
    const todayString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;

    if (date === todayString) {
      const nowMinutes = todayDate.getHours() * 60 + todayDate.getMinutes();
      for (const slot of timeSlots) {
        if (slot.timeSlotAsMinutes < nowMinutes) {
          slot.busyWorkers = maxWorkers;
        }
      }
    }

    //Controllo disponibilità workers
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

    for (const job of jobsArray) {
      const jobDate = new Date(job.Date_Time);
      const startJobMinutes = jobDate.getHours() * 60 + jobDate.getMinutes();
      const endJobMinutes = startJobMinutes + job.Total_Duration;

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
    let timeSlotsToFrontend = []; //{timeSlot,available}
    const timeSlotsNeeded = Math.ceil(sumMinutesServices / TIMESTEP_MINUTES); //nota: Math.ceil per evitare errori con TIMESTEP_MINUTES

    for (const slot of timeSlots) {
      const currentIndex = timeSlots.indexOf(slot);

      for (let i = 0; i < timeSlotsNeeded; i++) {
        const nextSlot = timeSlots[currentIndex + i];
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

export const saveBooking = async (req: Request, res: Response) => {
  try {
    const user = validateCustomer(req, res);
    const { Model, Vehicle_Type, License_Plate, Date_Time, ServicesArray } =
      req.body;

    //Controllo campi
    if (!Model || !Vehicle_Type || !License_Plate || !Date_Time || !user.id) {
      res.status(400).json({ message: "Attenzione: Compilare tutti i campi" });
      return;
    }
    if (!(Array.isArray(ServicesArray) && ServicesArray.length > 0)) {
      res.status(400).json({ message: "Attenzione: Servizi mancanti" });
      return;
    }

    try {
      await connection.beginTransaction();
      const [newJob] = (await connection.execute(
        `
        INSERT INTO JOB
        (Model, Vehicle_Type, License_Plate, Date_Time, CUSTOMER_ID) VALUES
        (?,?,?,?,?)
        `,
        [Model, Vehicle_Type, License_Plate, Date_Time, user.id],
      )) as any;
      const newJobId = newJob.insertId;

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

      await connection.commit();
      res.status(201).json({ message: "Prenotazione Confermata" });
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    errorHandler(req, res, error);
  }
};
