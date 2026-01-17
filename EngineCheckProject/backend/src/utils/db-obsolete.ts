import mysql, { Connection } from "mysql2";
import { Response } from "express";

//Imposta connessione
export const connection: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "EngineCheck",
});

// Metodi di utility vari:
//export const blockIfServerError = (res: Response, err: any) => {
//  if (err) {
//    console.error("Server/DB Error: ", err);
//    res.status(500).json({ message: "Errore Server: ", error: err });
//    return true;
//  }
//  return false;
//};

//Metodo wrapper di gestione degli errori server
export const onServerErrorHandled = (
  res: Response,
  action: (results: any) => void
) => {
  return (err: any, results: any) => {
    if (err) {
      console.error("Server/DB Error: ", err);
      res.status(500).json({ message: "Errore Server: ", error: err });
      return;
    };
    action(results);
};
}
