/* Crea Database */
``
CREATE DATABASE IF NOT EXISTS `blogisw` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `blogisw`;

CREATE TABLE `EMPLOYEE` (
    `Badge_Number` int(12) NOT NULL AUTO_INCREMENT,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Password` varchar(255) NOT NULL,
    PRIMARY KEY (`Badge_Number`)
);
CREATE TABLE `CUSTOMER` (
    `Email` varchar(255) NOT NULL,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Password` varchar(255) NOT NULL,
    `Phone` int(10) NOT NULL,
    PRIMARY KEY (`Email`)
);
CREATE TABLE `JOB` (
    `Job_ID` int(11) NOT NULL AUTO_INCREMENT,
    `Estimated_Duration` int(11) NOT NULL,
    `Title` varchar(255) NOT NULL,
    `Description` varchar(1000) NOT NULL,
    `Price` int(11) NOT NULL,
    `Vehicle_Type` varchar(50) NOT NULL, 
    CHECK (`Vehicle_Type` IN (`car`, `motorcycle`)),
    PRIMARY KEY (`Job_ID`)
);
CREATE TABLE `APPOINTMENT` (
    `Appointment_ID` int(11) NOT NULL AUTO_INCREMENT,
    `Model` varchar(100) NOT NULL,
    `Vehicle_Type` varchar(50) NOT NULL,
    `License_Plate` varchar(7) NOT NULL,    
    `Date_Time` DATETIME NOT NULL,
    `CUSTOMER_Email` varchar(255) NOT NULL,
    PRIMARY KEY (`Appointment_ID`),
    FOREIGN KEY (`CUSTOMER_Email`) REFERENCES `CUSTOMER` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE TABLE `COMPOSED_OF` (
    `APPOINTMENT_Appointment_ID` int(11) NOT NULL ,
    `JOB_Job_ID` int(11) NOT NULL ,
    PRIMARY KEY (`APPOINTMENT_Appointment_ID`, `JOB_Job_ID`),
    FOREIGN KEY (`APPOINTMENT_Appointment_ID`) REFERENCES `APPOINTMENT` (`Appointment_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE TABLE `PERFORMS` (
    `EMPLOYEE_Badge_Number` int(12) NOT NULL ,
    `JOB_Job_ID` int(11) NOT NULL ,
    PRIMARY KEY (`EMPLOYEE_Badge_Number`, `JOB_Job_ID`),
    FOREIGN KEY (`EMPLOYEE_Badge_Number`) REFERENCES `EMPLOYEE` (`Badge_Number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

/* Dump Dati*/
/* DA CREARE*/
