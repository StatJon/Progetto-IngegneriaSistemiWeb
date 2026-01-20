USE `engineCheck`;

-- =============================================
-- 1. POPOLAMENTO EMPLOYEE
-- password per tutti: pass123
-- =============================================
INSERT INTO `EMPLOYEE` (`ID_Badge_Number`, `First_Name`, `Last_Name`, `Password`, `Role`) VALUES
(1, 'Mario', 'Rossi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Admin'),
(2, 'Luigi', 'Verdi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
(3, 'Anna', 'Bianchi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
(4, 'Paolo', 'Neri', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker');

-- =============================================
-- 2. POPOLAMENTO CUSTOMER
-- password per tutti: pass123
-- =============================================
INSERT INTO `CUSTOMER` (`ID_Customer`, `Email`, `First_Name`, `Last_Name`, `Password`, `Phone`) VALUES
(1, 'giulia.romani@email.it', 'Giulia', 'Romani', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393331234567'),
(2, 'marco.ferri@gmail.com', 'Marco', 'Ferri', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393479876543'),
(3, 'sofia.gallo@hotmail.it', 'Sofia', 'Gallo', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393285551234'),
(4, 'luca.costa@email.it', 'Luca', 'Costa', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393391122334'),
(5, 'alessandro.rizzo@live.it', 'Alessandro', 'Rizzo', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393510001112');

-- =============================================
-- 3. POPOLAMENTO SERVICE
-- =============================================

-- --- CAR (AUTO) ---
INSERT INTO `SERVICE` (`Service_ID`, `Estimated_Duration_Minutes`, `Title`, `Description`, `Price`, `Vehicle_Type`, `Category`) VALUES
(1, 60, 'Tagliando Base Auto', 'Cambio olio e filtro olio.', 150.00, 'car', 'maintenance'),
(2, 90, 'Tagliando Completo', 'Cambio filtri aria/abitacolo, olio, check-up.', 280.00, 'car', 'maintenance'),
(3, 30, 'Ricarica Clima', 'Ricarica gas refrigerante.', 80.00, 'car', 'maintenance'),
(4, 30, 'Igienizzazione', 'Pulizia interni e sanificazione.', 50.00, 'car', 'maintenance'),
(5, 240, 'Kit Frizione', 'Sostituzione completa frizione.', 600.00, 'car', 'repair'),
(6, 180, 'Cinghia Distribuzione', 'Cambio kit distribuzione pompa acqua.', 450.00, 'car', 'repair'),
(7, 120, 'Alternatore', 'Sostituzione alternatore guasto.', 250.00, 'car', 'repair'),
(8, 60, 'Batteria', 'Sostituzione batteria 12V.', 100.00, 'car', 'repair'),
(9, 60, 'Cambio Gomme', 'Smontaggio/Rimontaggio stagionale.', 50.00, 'car', 'tyres'),
(10, 60, 'Convergenza', 'Regolazione assetto ruote.', 70.00, 'car', 'tyres'),
(11, 30, 'Riparazione Foratura', 'Riparazione tubeless.', 25.00, 'car', 'tyres'),
(12, 90, 'Ammortizzatori', 'Sostituzione ammortizzatori asse.', 300.00, 'car', 'tyres'),

-- --- MOTORCYCLE (MOTO) ---
(13, 60, 'Tagliando Moto', 'Cambio olio motore e filtro.', 110.00, 'motorcycle', 'maintenance'),
(14, 30, 'Pulizia Catena', 'Sgrassaggio e lubrificazione.', 30.00, 'motorcycle', 'maintenance'),
(15, 60, 'Liquido Freni', 'Spurgo impianto frenante.', 50.00, 'motorcycle', 'maintenance'),
(16, 150, 'Gioco Valvole', 'Verifica tolleranze.', 150.00, 'motorcycle', 'maintenance'), 
(17, 90, 'Revisione Forcelle', 'Sostituzione olio e paraoli.', 200.00, 'motorcycle', 'repair'),
(18, 60, 'Kit Trasmissione', 'Cambio corona, pignone, catena.', 180.00, 'motorcycle', 'repair'),
(19, 30, 'Pastiglie Freno', 'Cambio pastiglie anteriori.', 60.00, 'motorcycle', 'repair'),
(20, 120, 'Cuscinetti Sterzo', 'Sostituzione cuscinetti canotto.', 220.00, 'motorcycle', 'repair'),
(21, 30, 'Gomma Anteriore', 'Montaggio ed equilibratura.', 30.00, 'motorcycle', 'tyres'),
(22, 30, 'Gomma Posteriore', 'Montaggio ed equilibratura.', 40.00, 'motorcycle', 'tyres'),
(23, 60, 'Coppia Gomme', 'Cambio treno completo.', 60.00, 'motorcycle', 'tyres'),
(24, 30, 'Riparazione Moto', 'Riparazione foratura.', 20.00, 'motorcycle', 'tyres'); 

-- =============================================
-- 4. POPOLAMENTO JOB
-- =============================================
INSERT INTO `JOB` (`Job_ID`, `Model`, `Vehicle_Type`, `License_Plate`, `Date_Time`, `CUSTOMER_ID`) VALUES
(1, 'Fiat Panda', 'car', 'AA123BB', '2025-03-03 09:00:00', 1),     -- Lunedì
(2, 'Yamaha MT-07', 'motorcycle', 'AB12345', '2025-03-04 10:30:00', 2), -- Martedì
(3, 'VW Golf', 'car', 'CC456DD', '2025-03-05 14:00:00', 3),             -- Mercoledì
(4, 'Ducati Monster', 'motorcycle', 'DE67890', '2025-03-06 10:00:00', 4), -- Giovedì
(5, 'Ford Fiesta', 'car', 'EE789FF', '2025-03-07 11:30:00', 5),         -- Venerdì
(6, 'Audi A3', 'car', 'GG111HH', '2025-03-08 15:00:00', 1),             -- Sabato
(7, 'Honda SH', 'motorcycle', 'HI22233', '2025-03-10 16:30:00', 2),     -- Lunedì
(8, 'BMW X1', 'car', 'IL333MN', '2025-03-11 09:30:00', 3),              -- Martedì
(9, 'Kawasaki Z750', 'motorcycle', 'NO444PQ', '2025-03-12 17:00:00', 4),-- Mercoledì
(10, 'Jeep Renegade', 'car', 'RR555ST', '2025-03-13 08:30:00', 5);      -- Giovedì

-- =============================================
-- 5. POPOLAMENTO JOB_SERVICE
-- =============================================
INSERT INTO `JOB_SERVICE` (`JOB_Job_ID`, `SERVICE_Service_ID`, `JobService_Status`, `EMPLOYEE_Badge_Number`) VALUES
(1, 1, 'Completed', 2),
(1, 11, 'Completed', 2),
(2, 13, 'Completed', 3),
(3, 5, 'Pending', NULL),
(4, 21, 'Working', 2),
(4, 22, 'Working', 2),
(5, 3, 'Assigned', 4),
(6, 2, 'Cancelled', NULL),
(7, 18, 'Pending', NULL),
(8, 9, 'Working', 3),
(9, 17, 'Completed', 2),
(10, 8, 'Pending', NULL);