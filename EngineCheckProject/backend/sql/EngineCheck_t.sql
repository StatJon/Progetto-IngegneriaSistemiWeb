/* Tables */
``

CREATE TABLE `DIPENDENTE` (
    `N_Badge` int NOT NULL AUTO_INCREMENT,
    `Nome` varchar NOT NULL,
    `Cognome` varchar NOT NULL,
    `Password` varchar NOT NULL,
    PRIMARY KEY (`N_Badge`)
);
CREATE TABLE `CLIENTE` (
    `Email` varchar NOT NULL,
    `Nome` varchar NOT NULL,
    `Cognome` varchar NOT NULL,
    `Password` varchar NOT NULL,
    `Telefono` int(10) NOT NULL,
    PRIMARY KEY (`Email`)
);
CREATE TABLE `LAVORO` (
    `ID_Lavoro` int NOT NULL AUTO_INCREMENT,
    `DurataPrevista` int NOT NULL,
    `Titolo` varchar NOT NULL,
    `Descrizione` varchar NOT NULL,
    `Prezzo` int NOT NULL,
    PRIMARY KEY (`ID_Lavoro`)
);
CREATE TABLE `APPUNTAMENTO` (
    `ID_Appuntamento` int NOT NULL AUTO_INCREMENT,
    `modello` varchar NOT NULL,
    `tipoAutoMoto` int NOT NULL,
    `targa` varchar(7) NOT NULL,    
    `data_ora` DATETIME NOT NULL,
    `CLIENTE_Email` varchar NOT NULL,
    PRIMARY KEY (`ID_Appuntamento`),
    FOREIGN KEY (`CLIENTE_Email`) REFERENCES `CLIENTE` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE TABLE `COMPOSTO_DA` (
    `APPUNTAMENTO_ID_Appuntamento` int NOT NULL ,
    `LAVORO_ID_Lavoro` int NOT NULL ,
    PRIMARY KEY (`APPUNTAMENTO_ID_Appuntamento`, `LAVORO_ID_Lavoro`),
    FOREIGN KEY (`APPUNTAMENTO_ID_Appuntamento`) REFERENCES `APPUNTAMENTO` (`ID_Appuntamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`LAVORO_ID_Lavoro`) REFERENCES `LAVORO` (`ID_Lavoro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE TABLE `SVOLGE` (
    `DIPENDENTE_N_Badge` int NOT NULL ,
    `LAVORO_ID_Lavoro` int NOT NULL ,
    PRIMARY KEY (`DIPENDENTE_N_Badge`, `LAVORO_ID_Lavoro`),
    FOREIGN KEY (`DIPENDENTE_N_Badge`) REFERENCES `DIPENDENTE` (`N_Badge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`LAVORO_ID_Lavoro`) REFERENCES `LAVORO` (`ID_Lavoro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);