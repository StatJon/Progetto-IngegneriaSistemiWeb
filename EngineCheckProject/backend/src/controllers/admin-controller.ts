import { Request, Response } from "express";
import { getUser, setUser, unsetUser, User } from "../utils/auth";
import { connection } from "../utils/db";

export const listAllEmployees = async (req: Request, res: Response) => {
  try {
    const user = getUser(req, res);
    if (!user) {
      res.status(401).json({ message: "Attenzione: autenticazione richiesta" });
      return;
    }
    if (user.role != "Admin") {
      res
        .status(401)
        .json({ message: "Attenzione: operazione non autorizzabile" });
      return;
    }

    const [employeeList] = (await connection.execute(
      "SELECT ID_Badge_Number, First_Name, Last_Name, Role FROM EMPLOYEE",
      []
    )) as any;

    res.status(200).json(employeeList);
  } catch (error) {
    console.error("Errore: ", error);
    res.status(500).json({ message: "Errore del Server/DB", error: error });
  }
};

export const removeEmployee = async (req: Request, res: Response) => {
  try {
    const user = getUser(req, res);
    if (!user) {
      res.status(401).json({ message: "Attenzione: autenticazione richiesta" });
      return;
    }
    if (user.role != "Admin") {
      res
        .status(401)
        .json({ message: "Attenzione: operazione non autorizzabile" });
      return;
    }

    const { ID_Badge_Number } = req.body;

    const [employeeToBeDeleted] = (await connection.execute(
      "SELECT First_Name, Last_Name, Role FROM EMPLOYEE WHERE ID_Badge_Number = ?",
      [ID_Badge_Number]
    )) as any;

    if (employeeToBeDeleted.Role === "Admin") {
      res
        .status(401)
        .json({ message: "Attenzione: Dipendente Admin non cancellabile" });
      return;
    }

    await connection.execute(
      "DELETE * FROM EMPLOYEE WHERE 'ID_Badge_Number = ?",
      [ID_Badge_Number]
    );

    res.status(200).json({
      message: "Successo, Dipendente rimosso",
      employee:
        employeeToBeDeleted.First_Name + " " + employeeToBeDeleted.Last_Name,
    });
  } catch (error) {
    console.error("Errore: ", error);
    res.status(500).json({ message: "Errore del Server/DB", error: error });
  }
};