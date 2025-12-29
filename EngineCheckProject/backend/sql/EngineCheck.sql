/* Crea Database */

CREATE DATABASE IF NOT EXISTS `engineCheck` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `engineCheck`;

CREATE TABLE IF NOT EXISTS `EMPLOYEE` (
    `Badge_Number` int(12) NOT NULL AUTO_INCREMENT,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Password` varchar(255) NOT NULL,
    PRIMARY KEY (`Badge_Number`)
);
CREATE TABLE IF NOT EXISTS `CUSTOMER` (
    `Email` varchar(255) NOT NULL,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Password` varchar(255) NOT NULL,
    `Phone` varchar(13) NOT NULL,
    PRIMARY KEY (`Email`)
);
/*Il singolo servizio standard da effettuare/offrire*/
CREATE TABLE IF NOT EXISTS `SERVICE` (
    `Service_ID` int(11) NOT NULL AUTO_INCREMENT,
    `Estimated_Duration` int(11) NOT NULL,
    `Title` varchar(255) NOT NULL,
    `Description` varchar(1000) NOT NULL,
    `Price` decimal(10, 2) NOT NULL,
    `Vehicle_Type` varchar(50) NOT NULL, 
    CHECK (`Vehicle_Type` IN ('car', 'motorcycle')),
    PRIMARY KEY (`Service_ID`)
);
/*L'appuntamento con tutti i dati relativi*/
CREATE TABLE IF NOT EXISTS `JOB` (
    `Job_ID` int(11) NOT NULL AUTO_INCREMENT,
    `Model` varchar(100) NOT NULL,
    `Vehicle_Type` varchar(50) NOT NULL,
    `License_Plate` varchar(7) NOT NULL,    
    `Date_Time` DATETIME NOT NULL,
    `CUSTOMER_Email` varchar(255) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT FALSE,
    `isInProgress` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`Job_ID`),
    FOREIGN KEY (`CUSTOMER_Email`) REFERENCES `CUSTOMER` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
/*Lega un JOB con tutti i SERVICE relativi*/
CREATE TABLE IF NOT EXISTS `SERVICES_OF_JOB` (
    `JOB_Job_ID` int(11) NOT NULL ,
    `SERVICE_Service_ID` int(11) NOT NULL ,
    PRIMARY KEY (`JOB_Job_ID`, `SERVICE_Service_ID`),
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`SERVICE_Service_ID`) REFERENCES `SERVICE` (`Service_ID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);
/*Lega un EMPLOYEE ad un JOB*/
CREATE TABLE IF NOT EXISTS `EMPLOYEE_OF_JOB` (
    `EMPLOYEE_Badge_Number` int(12) NOT NULL ,
    `JOB_Job_ID` int(11) NOT NULL ,
    PRIMARY KEY (`EMPLOYEE_Badge_Number`, `JOB_Job_ID`),
    FOREIGN KEY (`EMPLOYEE_Badge_Number`) REFERENCES `EMPLOYEE` (`Badge_Number`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

/* Dump Dati*/
/* DA CREARE*/
