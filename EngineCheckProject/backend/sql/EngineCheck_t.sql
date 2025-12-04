/* Tables */
``

CREATE TABLE `EMPLOYEE` (
    `Badge_Number` int NOT NULL AUTO_INCREMENT,
    `First_Name` varchar NOT NULL,
    `Last_Name` varchar NOT NULL,
    `Password` varchar NOT NULL,
    PRIMARY KEY (`Badge_Number`)
);
CREATE TABLE `CUSTOMER` (
    `Email` varchar NOT NULL,
    `First_Name` varchar NOT NULL,
    `Last_Name` varchar NOT NULL,
    `Password` varchar NOT NULL,
    `Phone` int(10) NOT NULL,
    PRIMARY KEY (`Email`)
);
CREATE TABLE `JOB` (
    `Job_ID` int NOT NULL AUTO_INCREMENT,
    `Estimated_Duration` int NOT NULL,
    `Title` varchar NOT NULL,
    `Description` varchar NOT NULL,
    `Price` int NOT NULL,
    PRIMARY KEY (`Job_ID`)
);
CREATE TABLE `APPOINTMENT` (
    `Appointment_ID` int NOT NULL AUTO_INCREMENT,
    `Model` varchar NOT NULL,
    `Vehicle_Type` int NOT NULL,
    `License_Plate` varchar(7) NOT NULL,    
    `Date_Time` DATETIME NOT NULL,
    `CUSTOMER_Email` varchar NOT NULL,
    PRIMARY KEY (`Appointment_ID`),
    FOREIGN KEY (`CUSTOMER_Email`) REFERENCES `CUSTOMER` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE TABLE `COMPOSED_OF` (
    `APPOINTMENT_Appointment_ID` int NOT NULL ,
    `JOB_Job_ID` int NOT NULL ,
    PRIMARY KEY (`APPOINTMENT_Appointment_ID`, `JOB_Job_ID`),
    FOREIGN KEY (`APPOINTMENT_Appointment_ID`) REFERENCES `APPOINTMENT` (`Appointment_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE TABLE `PERFORMS` (
    `EMPLOYEE_Badge_Number` int NOT NULL ,
    `JOB_Job_ID` int NOT NULL ,
    PRIMARY KEY (`EMPLOYEE_Badge_Number`, `JOB_Job_ID`),
    FOREIGN KEY (`EMPLOYEE_Badge_Number`) REFERENCES `EMPLOYEE` (`Badge_Number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`JOB_Job_ID`) REFERENCES `JOB` (`Job_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);