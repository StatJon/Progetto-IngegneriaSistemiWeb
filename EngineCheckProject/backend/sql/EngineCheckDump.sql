/*Dump dati d'esempio, generato con Gemini*/

USE `engineCheck`;

-- =============================================
-- 1. POPOLAMENTO EMPLOYEE
-- ID 1: Admin, ID 2-4: Worker, Password per tutti: pass123
-- =============================================
INSERT INTO `EMPLOYEE` (`First_Name`, `Last_Name`, `Password`, `Role`) VALUES
('Mario', 'Rossi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Admin'),
('Luigi', 'Verdi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
('Anna', 'Bianchi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
('Paolo', 'Neri', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker');

-- =============================================
-- 2. POPOLAMENTO CUSTOMER
-- Email uniche, Nomi italiani, Tel E.164, Password per tutti: pass123
-- =============================================
INSERT INTO `CUSTOMER` (`Email`, `First_Name`, `Last_Name`, `Password`, `Phone`) VALUES
('giulia.romani@email.it', 'Giulia', 'Romani', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393331234567'),
('marco.ferri@gmail.com', 'Marco', 'Ferri', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393479876543'),
('sofia.gallo@hotmail.it', 'Sofia', 'Gallo', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393285551234'),
('luca.costa@email.it', 'Luca', 'Costa', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393391122334'),
('alessandro.rizzo@live.it', 'Alessandro', 'Rizzo', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393510001112');

-- =============================================
-- 3. POPOLAMENTO SERVICE
-- Categorie: maintenance, repair, tyres
-- =============================================

-- --- CAR (AUTO) ---
-- Maintenance
INSERT INTO `SERVICE` (`Estimated_Duration_Minutes`, `Title`, `Description`, `Price`, `Vehicle_Type`, `Category`) VALUES
(60, 'Tagliando Base Auto', 'Cambio olio e filtro olio.', 150.00, 'car', 'maintenance'),
(90, 'Tagliando Completo', 'Cambio filtri aria/abitacolo, olio, check-up.', 280.00, 'car', 'maintenance'),
(30, 'Ricarica Clima', 'Ricarica gas refrigerante.', 80.00, 'car', 'maintenance'),
(45, 'Igienizzazione', 'Pulizia interni e sanificazione.', 50.00, 'car', 'maintenance'),

-- Repair
(240, 'Kit Frizione', 'Sostituzione completa frizione.', 600.00, 'car', 'repair'),
(180, 'Cinghia Distribuzione', 'Cambio kit distribuzione pompa acqua.', 450.00, 'car', 'repair'),
(120, 'Alternatore', 'Sostituzione alternatore guasto.', 250.00, 'car', 'repair'),
(60, 'Batteria', 'Sostituzione batteria 12V.', 100.00, 'car', 'repair'),

-- Tyres
(45, 'Cambio Gomme', 'Smontaggio/Rimontaggio stagionale.', 50.00, 'car', 'tyres'),
(60, 'Convergenza', 'Regolazione assetto ruote.', 70.00, 'car', 'tyres'),
(30, 'Riparazione Foratura', 'Riparazione tubeless.', 25.00, 'car', 'tyres'),
(90, 'Ammortizzatori', 'Sostituzione ammortizzatori asse.', 300.00, 'car', 'tyres'),

-- --- MOTORCYCLE (MOTO) ---
-- Maintenance
(60, 'Tagliando Moto', 'Cambio olio motore e filtro.', 110.00, 'motorcycle', 'maintenance'),
(30, 'Pulizia Catena', 'Sgrassaggio e lubrificazione.', 30.00, 'motorcycle', 'maintenance'),
(45, 'Liquido Freni', 'Spurgo impianto frenante.', 50.00, 'motorcycle', 'maintenance'),
(60, 'Gioco Valvole', 'Verifica tolleranze.', 150.00, 'motorcycle', 'maintenance'),

-- Repair
(90, 'Revisione Forcelle', 'Sostituzione olio e paraoli.', 200.00, 'motorcycle', 'repair'),
(60, 'Kit Trasmissione', 'Cambio corona, pignone, catena.', 180.00, 'motorcycle', 'repair'),
(40, 'Pastiglie Freno', 'Cambio pastiglie anteriori.', 60.00, 'motorcycle', 'repair'),
(120, 'Cuscinetti Sterzo', 'Sostituzione cuscinetti canotto.', 220.00, 'motorcycle', 'repair'),

-- Tyres
(30, 'Gomma Anteriore', 'Montaggio ed equilibratura.', 30.00, 'motorcycle', 'tyres'),
(40, 'Gomma Posteriore', 'Montaggio ed equilibratura.', 40.00, 'motorcycle', 'tyres'),
(60, 'Coppia Gomme', 'Cambio treno completo.', 60.00, 'motorcycle', 'tyres'),
(20, 'Riparazione Moto', 'Riparazione foratura.', 20.00, 'motorcycle', 'tyres');

-- =============================================
-- 4. POPOLAMENTO JOB
-- Stati misti per testare la logica
-- =============================================
INSERT INTO `JOB` (`Model`, `Vehicle_Type`, `License_Plate`, `Date_Time`, `CUSTOMER_ID`, `Job_Status`) VALUES
('Fiat Panda', 'car', 'AA123BB', '2023-10-20 09:00:00', 1, 'Completed'), -- ID 1
('Yamaha MT-07', 'motorcycle', 'AB12345', '2023-10-21 10:30:00', 2, 'Completed'), -- ID 2
('VW Golf', 'car', 'CC456DD', NOW() + INTERVAL 2 DAY, 3, 'Pending'),   -- ID 3 (Futuro, Nessun dipendente)
('Ducati Monster', 'motorcycle', 'DE67890', NOW(), 4, 'Working'),             -- ID 4 (In corso oggi)
('Ford Fiesta', 'car', 'EE789FF', NOW() + INTERVAL 1 HOUR, 5, 'Assigned'),  -- ID 5 (Tra poco)
('Audi A3', 'car', 'GG111HH', '2023-10-25 15:00:00', 1, 'Cancelled'),   -- ID 6
('Honda SH', 'motorcycle', 'HI22233', NOW() + INTERVAL 3 DAY, 2, 'Pending'),   -- ID 7 (Futuro, Nessun dipendente)
('BMW X1', 'car', 'IL333MN', NOW(), 3, 'Working'),             -- ID 8 (In corso oggi)
('Kawasaki Z750', 'motorcycle', 'NO444PQ', NOW() - INTERVAL 1 DAY, 4, 'Completed'), -- ID 9
('Jeep Renegade', 'car', 'RR555ST', NOW() + INTERVAL 5 DAY, 5, 'Pending');   -- ID 10

-- =============================================
-- 5. POPOLAMENTO SERVICES_OF_JOB
-- =============================================
INSERT INTO `SERVICES_OF_JOB` (`JOB_Job_ID`, `SERVICE_Service_ID`, `Quantity`) VALUES
(1, 1, 1), (1, 11, 1), -- Panda: Tagliando + Foratura
(2, 13, 1),            -- Yamaha: Tagliando Moto
(3, 5, 1),             -- Golf: Frizione
(4, 21, 1), (4, 22, 1),-- Ducati: Gomme Ant+Post
(5, 3, 1),             -- Fiesta: Clima
(6, 2, 1),             -- Audi: Tagliando Completo (Cancellato)
(7, 18, 1),            -- Honda: Trasmissione
(8, 9, 4),             -- BMW: 4 Gomme estive
(9, 17, 1),            -- Kawasaki: Forcelle
(10, 8, 1);            -- Jeep: Batteria

-- =============================================
-- 6. POPOLAMENTO EMPLOYEE_OF_JOB
-- IMPORTANTE: Solo i job 'Assigned', 'Working' o 'Completed' hanno un dipendente.
-- I job 'Pending' (3, 7, 10) e 'Cancelled' (6) NON sono qui.
-- =============================================
INSERT INTO `EMPLOYEE_OF_JOB` (`EMPLOYEE_Badge_Number`, `JOB_Job_ID`) VALUES
(2, 1), -- Luigi ha fatto la Panda
(3, 2), -- Anna ha fatto la Yamaha
(2, 4), -- Luigi sta lavorando sulla Ducati
(4, 5), -- Paolo è assegnato alla Fiesta
(3, 8), -- Anna sta lavorando sulla BMW
(2, 9); -- Luigi ha fatto la Kawasaki




