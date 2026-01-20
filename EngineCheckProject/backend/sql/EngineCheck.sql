/* Crea Database */

CREATE DATABASE IF NOT EXISTS `engineCheck` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `engineCheck`;

/*Nota per continuità dei campi:
varchar senza CHECK : varchar(100)
varchar con CHECK : varchar(32)
password/email : varchar(255)
int : int(12)
decimal : (10,2)
*/

CREATE TABLE IF NOT EXISTS `EMPLOYEE` (
    `ID_Badge_Number` int(12) NOT NULL AUTO_INCREMENT,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Password` varchar(255) NOT NULL,
    `Role` varchar(32) NOT NULL,
    CHECK (`Role` IN ('Worker', 'Admin', 'Inactive')),
    PRIMARY KEY (`ID_Badge_Number`)
);
CREATE TABLE IF NOT EXISTS `CUSTOMER` (
    `ID_Customer` int(12) NOT NULL AUTO_INCREMENT,
    `Email` varchar(255) NOT NULL UNIQUE,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Password` varchar(255) NOT NULL,
    `Phone` varchar(13) NOT NULL, /*Nota: viene validato dal controller*/
    PRIMARY KEY (`ID_Customer`)
);
/*Il singolo servizio standard da listino da effettuare/offrire*/
CREATE TABLE IF NOT EXISTS `SERVICE` (
    `Service_ID` int(12) NOT NULL AUTO_INCREMENT,
    `Estimated_Duration_Minutes` int(12) NOT NULL,
    `Title` varchar(100) NOT NULL,
    `Description` varchar(1000) NOT NULL,
    `Price` decimal(10, 2) NOT NULL,
    `Vehicle_Type` varchar(32) NOT NULL, 
    `Category` varchar(32) NOT NULL,
    CHECK (`Category` IN ('maintenance', 'repair', 'tyres')),
    CHECK (`Vehicle_Type` IN ('car', 'motorcycle')),
    PRIMARY KEY (`Service_ID`)
);
/*L'appuntamento con tutti i dati relativi*/
CREATE TABLE IF NOT EXISTS `JOB` (
    `Job_ID` int(12) NOT NULL AUTO_INCREMENT,
    `Model` varchar(100) NOT NULL,
    `Vehicle_Type` varchar(32) NOT NULL,
    `License_Plate` varchar(15) NOT NULL, /*NOTA: ITA è 7, 15 per sicurezza in caso di targhe non ITA Standard*/ 
    `Date_Time` DATETIME NOT NULL,
    `CUSTOMER_ID` int(12) NOT NULL,
    PRIMARY KEY (`Job_ID`),
    FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER` (`ID_Customer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
/*Lega un JOB con tutti i SERVICE relativi, per ogni JobService assegna Status ed Employee*/
CREATE TABLE IF NOT EXISTS `JOB_SERVICE` (
    `JOB_Job_ID` int(12) NOT NULL ,
    `SERVICE_Service_ID` int(12) NOT NULL ,
    `JobService_Status` varchar(32) NOT NULL DEFAULT 'Pending',
    `EMPLOYEE_Badge_Number` int(12) DEFAULT NULL,
    CHECK (`JobService_Status` IN ('Pending', 'Assigned', 'Working', 'Completed', 'Cancelled')),
    PRIMARY KEY (`JOB_Job_ID`, `SERVICE_Service_ID`),
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`SERVICE_Service_ID`) REFERENCES `SERVICE` (`Service_ID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`EMPLOYEE_Badge_Number`) REFERENCES `EMPLOYEE` (`ID_Badge_Number`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);
