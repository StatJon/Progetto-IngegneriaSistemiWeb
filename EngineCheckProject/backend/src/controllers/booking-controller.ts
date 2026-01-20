import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import {
  validateUserLoggedIn,
  validateUserNotLoggedIn,
  validateAdmin,
  errorHandler,
  validateCustomer,
} from "../utils/auth-helpers";
import { connection } from "../utils/db";

//flow booking:

//all'apertura pagina:
//--get checkDayAvailable per evidenziare i giorni non festivi
//alla selezione giorno:
//--get checkTimeAvailability per ritornare gli orari da visualizzare in menu a tendina o "giornata piena"
//alla conferma:
//--post saveBooking per INSERT in DB

//GET richiesto parametro URL /monthYear in formato aaaa-mm es 2026-05-20
//Restituisce giorni disponibili per il mese in questione in formato: json({yearMonth : yyyy-mm, daysAvailable : {day : day, available : bool})
export const checkDayAvailable = async (req: Request, res: Response) => {
  try {
    //Recupero dati,
    const param = req.params.yearMonth;

    //Controllo dati, dichiarazione senza assegnazione
    let targetYear: number;
    let targetMonth: number;

    
    if (!param) {//Se non è stato passato alcun param -> default ad oggi
      const today = new Date();
      const year: number = today.getFullYear();
      const month: number = today.getMonth() + 1; //<-- getMonth parte da 0
      targetYear = year;
      targetMonth = month;
    } else {//Se c'è param -> prepara i campi
      //fare parsing/cast string--->number
      const [targetYearStr, targetMonthStr]: any = param.split("-");
      if ([targetYearStr, targetMonthStr].length === 2) {
        const year: number = parseInt(targetYearStr);
        const month: number = parseInt(targetMonthStr);
        targetYear = year;
        targetMonth = month;
        //isNaN da controllare
      } else {//Se param passato è errato -> 400
        res
          .status(400)
          .json({ message: "Formato non valido, usare formato aaaa-mm" });
        return;
      }
    }
    //Da qui usare: todayDay, targetMonth, targetYear

    const calendarResults = []; //Crea stack giorni
    const daysOfMonth = new Date(targetYear, targetMonth, 0).getDate(); //Trova giorno ultimo del mese, per for a seguire

    /*for, pseudocode:
    Per ogni giorno del mese,
    controlla se è passato,
    controlla se è domenica (.getDay==0), 
    controlla se è festività (WIP),
    .push su calendarResults json.{day : day , available : false|true}
    */

    const today = new Date();
     today.setHours(0,0,0,0);

    for (let day = 1; day <= daysOfMonth; day++) {
      let available : boolean = true; //Dichiara campo per json dopo

      const dateToCheck = new Date(targetYear,targetMonth-1,day);
      dateToCheck.setHours(0,0,0,0);

      //check giorno passato
      if (dateToCheck < today){available = false};

      //check domenica
      if (dateToCheck.getDay() === 0) {available = false};

      //check festività 
      //<--- DA FARE, se rimane tempo, richiede DB,CRUD,Pagina frontend --->

      calendarResults.push({
        day : day,
        available : available
      });
    }
    
    res.status(200).json({yearMonth: targetYear+"-"+targetMonth,
                          daysAvailable : calendarResults})
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export const checkTimeAvailability = async (req: Request, res: Response) => {
  /*
  //importa ServicesArray
  const {ServicesArray} = req.body;

  //calcola tempo necessario
  let timeTotal : number = 0;
  for (const service of ServicesArray) {
    const [resultService] = await connection.execute(
      `SELECT Estimated_Duration_Minutes 
        FROM SERVICE 
        WHERE Service_ID = ?
        `,
      [service],
    ) as any;
    const timeService = resultService.Estimated_Duration_Minutes;
    timeTotal += timeService;
  }
    */
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
      Customer_ID,
      ServicesArray,
    } = req.body;

    //Controllo campi
    if (
      !Model ||
      !Vehicle_Type ||
      !License_Plate ||
      !Date_Time ||
      !Customer_ID
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
      [Model, Vehicle_Type, License_Plate, Date_Time, Customer_ID],
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
    res.status(200).json({ message: "Prenotazione Confermata" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};
