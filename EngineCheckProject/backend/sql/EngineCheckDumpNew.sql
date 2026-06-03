USE `engineCheck`;

-- =============================================
-- 1. POPOLAMENTO EMPLOYEE
-- password per tutti: pass123
-- =============================================
INSERT INTO `EMPLOYEE` (`ID_Badge_Number`, `First_Name`, `Last_Name`, `Password`, `Role`) VALUES
(1, 'Mario',  'Rossi',   '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Admin'),
(2, 'Luigi',  'Verdi',   '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
(3, 'Anna',   'Bianchi', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
(4, 'Paolo',  'Neri',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
(5, 'Chiara', 'Russo',   '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker'),
(6, 'Davide', 'Ferrari', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', 'Worker');

-- =============================================
-- 2. POPOLAMENTO CUSTOMER
-- password per tutti: pass123
-- =============================================
INSERT INTO `CUSTOMER` (`ID_Customer`, `Email`, `First_Name`, `Last_Name`, `Password`, `Phone`) VALUES
(1,  'giulia.romani@email.it',     'Giulia',     'Romani',   '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393331234567'),
(2,  'marco.ferri@gmail.com',      'Marco',      'Ferri',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393479876543'),
(3,  'sofia.gallo@hotmail.it',     'Sofia',      'Gallo',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393285551234'),
(4,  'luca.costa@email.it',        'Luca',       'Costa',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393391122334'),
(5,  'alessandro.rizzo@live.it',   'Alessandro', 'Rizzo',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393510001112'),
(6,  'francesca.marino@email.it',  'Francesca',  'Marino',   '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393621112223'),
(7,  'roberto.conti@gmail.com',    'Roberto',    'Conti',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393734445556'),
(8,  'valentina.esposito@live.it', 'Valentina',  'Esposito', '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393847778889'),
(9,  'andrea.colombo@email.it',    'Andrea',     'Colombo',  '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393958889990'),
(10, 'martina.ricci@hotmail.it',   'Martina',    'Ricci',    '$2a$12$FAonyfruDFZy4o16m3Kewe.1iKzt4xF/cQeadJj9ogNvpgRwwstoq', '+393061234321');

-- =============================================
-- 3. POPOLAMENTO SERVICE (invariato)
-- =============================================
INSERT INTO `SERVICE` (`Service_ID`, `Estimated_Duration_Minutes`, `Title`, `Description`, `Price`, `Vehicle_Type`, `Category`) VALUES
(1,  60,  'Tagliando Base Auto',    'Cambio olio e filtro olio.',                     150.00, 'car', 'maintenance'),
(2,  90,  'Tagliando Completo',     'Cambio filtri aria/abitacolo, olio, check-up.',  280.00, 'car', 'maintenance'),
(3,  30,  'Ricarica Clima',         'Ricarica gas refrigerante.',                      80.00, 'car', 'maintenance'),
(4,  30,  'Igienizzazione',         'Pulizia interni e sanificazione.',                50.00, 'car', 'maintenance'),
(5,  240, 'Kit Frizione',           'Sostituzione completa frizione.',                600.00, 'car', 'repair'),
(6,  180, 'Cinghia Distribuzione',  'Cambio kit distribuzione pompa acqua.',          450.00, 'car', 'repair'),
(7,  120, 'Alternatore',            'Sostituzione alternatore guasto.',               250.00, 'car', 'repair'),
(8,  60,  'Batteria',               'Sostituzione batteria 12V.',                     100.00, 'car', 'repair'),
(9,  60,  'Cambio Gomme',           'Smontaggio/Rimontaggio stagionale.',              50.00, 'car', 'tyres'),
(10, 60,  'Convergenza',            'Regolazione assetto ruote.',                      70.00, 'car', 'tyres'),
(11, 30,  'Riparazione Foratura',   'Riparazione tubeless.',                           25.00, 'car', 'tyres'),
(12, 90,  'Ammortizzatori',         'Sostituzione ammortizzatori asse.',              300.00, 'car', 'tyres'),
(13, 60,  'Tagliando Moto',         'Cambio olio motore e filtro.',                   110.00, 'motorcycle', 'maintenance'),
(14, 30,  'Pulizia Catena',         'Sgrassaggio e lubrificazione.',                   30.00, 'motorcycle', 'maintenance'),
(15, 60,  'Liquido Freni',          'Spurgo impianto frenante.',                       50.00, 'motorcycle', 'maintenance'),
(16, 150, 'Gioco Valvole',          'Verifica tolleranze.',                           150.00, 'motorcycle', 'maintenance'),
(17, 90,  'Revisione Forcelle',     'Sostituzione olio e paraoli.',                   200.00, 'motorcycle', 'repair'),
(18, 60,  'Kit Trasmissione',       'Cambio corona, pignone, catena.',                180.00, 'motorcycle', 'repair'),
(19, 30,  'Pastiglie Freno',        'Cambio pastiglie anteriori.',                     60.00, 'motorcycle', 'repair'),
(20, 120, 'Cuscinetti Sterzo',      'Sostituzione cuscinetti canotto.',               220.00, 'motorcycle', 'repair'),
(21, 30,  'Gomma Anteriore',        'Montaggio ed equilibratura.',                     30.00, 'motorcycle', 'tyres'),
(22, 30,  'Gomma Posteriore',       'Montaggio ed equilibratura.',                     40.00, 'motorcycle', 'tyres'),
(23, 60,  'Coppia Gomme',           'Cambio treno completo.',                          60.00, 'motorcycle', 'tyres'),
(24, 30,  'Riparazione Moto',       'Riparazione foratura.',                           20.00, 'motorcycle', 'tyres');

-- =============================================
-- 4. POPOLAMENTO JOB
-- Date a partire da oggi (2026-06-03), solo lun-sab
-- =============================================
INSERT INTO `JOB` (`Job_ID`, `Model`, `Vehicle_Type`, `License_Plate`, `Date_Time`, `CUSTOMER_ID`) VALUES
-- Settimana 1 (03-06 giu 2026)
(1,  'Fiat Panda',         'car',        'AA123BB', '2026-06-03 09:00:00', 1),
(2,  'Yamaha MT-07',       'motorcycle', 'AB12345', '2026-06-03 10:30:00', 2),
(3,  'VW Golf',            'car',        'CC456DD', '2026-06-03 14:00:00', 3),
(4,  'Ducati Monster',     'motorcycle', 'DE67890', '2026-06-04 09:00:00', 4),
(5,  'Ford Fiesta',        'car',        'EE789FF', '2026-06-04 11:30:00', 5),
(6,  'Audi A3',            'car',        'GG111HH', '2026-06-04 15:00:00', 6),
(7,  'Honda SH',           'motorcycle', 'HI22233', '2026-06-05 09:00:00', 7),
(8,  'BMW X1',             'car',        'IL333MN', '2026-06-05 11:00:00', 8),
(9,  'Kawasaki Z750',      'motorcycle', 'NO444PQ', '2026-06-05 14:30:00', 9),
(10, 'Jeep Renegade',      'car',        'RR555ST', '2026-06-06 08:30:00', 10),
-- Settimana 2 (08-13 giu 2026)
(11, 'Toyota Yaris',       'car',        'SS666TT', '2026-06-08 09:00:00', 1),
(12, 'Honda CBR',          'motorcycle', 'TT777UU', '2026-06-08 11:00:00', 2),
(13, 'Renault Clio',       'car',        'UU888VV', '2026-06-09 09:30:00', 3),
(14, 'BMW GS 1200',        'motorcycle', 'VV999WW', '2026-06-09 14:00:00', 4),
(15, 'Opel Corsa',         'car',        'WW000XX', '2026-06-10 10:00:00', 5),
(16, 'Vespa GTS',          'motorcycle', 'XX111YY', '2026-06-10 15:30:00', 6),
(17, 'Peugeot 208',        'car',        'YY222ZZ', '2026-06-11 08:30:00', 7),
(18, 'Suzuki GSX',         'motorcycle', 'ZZ333AA', '2026-06-11 11:00:00', 8),
(19, 'Seat Ibiza',         'car',        'AA444BB', '2026-06-12 09:00:00', 9),
(20, 'Aprilia RS',         'motorcycle', 'BB555CC', '2026-06-12 14:00:00', 10),
-- Settimana 3 (15-20 giu 2026)
(21, 'Nissan Micra',       'car',        'CC666DD', '2026-06-15 09:00:00', 1),
(22, 'KTM Duke',           'motorcycle', 'DD777EE', '2026-06-15 11:30:00', 2),
(23, 'Alfa Romeo Giulia',  'car',        'EE888FF', '2026-06-16 10:00:00', 3),
(24, 'Triumph Bonneville', 'motorcycle', 'FF999GG', '2026-06-16 14:00:00', 4),
(25, 'Skoda Fabia',        'car',        'GG000HH', '2026-06-17 09:30:00', 5),
(26, 'Piaggio Liberty',    'motorcycle', 'HH111II', '2026-06-17 15:00:00', 6),
(27, 'Hyundai i20',        'car',        'II222JJ', '2026-06-18 08:30:00', 7),
(28, 'Harley Sportster',   'motorcycle', 'JJ333KK', '2026-06-18 11:00:00', 8),
(29, 'Citroen C3',         'car',        'KK444LL', '2026-06-19 09:00:00', 9),
(30, 'Suzuki Burgman',     'motorcycle', 'LL555MM', '2026-06-19 14:30:00', 10);

-- =============================================
-- 5. POPOLAMENTO JOB_SERVICE
-- Mix realistico di stati e worker
-- =============================================
INSERT INTO `JOB_SERVICE` (`JOB_Job_ID`, `SERVICE_Service_ID`, `JobService_Status`, `EMPLOYEE_Badge_Number`) VALUES
-- Job 1: Fiat Panda - tagliando + cambio gomme
(1,  1,  'Pending',  NULL),
(1,  9,  'Pending',  NULL),
-- Job 2: Yamaha MT-07 - tagliando moto
(2,  13, 'Assigned', 2),
-- Job 3: VW Golf - frizione + batteria
(3,  5,  'Working',  3),
(3,  8,  'Working',  3),
-- Job 4: Ducati Monster - coppia gomme
(4,  21, 'Working',  2),
(4,  22, 'Working',  2),
-- Job 5: Ford Fiesta - clima + igienizzazione
(5,  3,  'Assigned', 4),
(5,  4,  'Assigned', 4),
-- Job 6: Audi A3 - tagliando completo
(6,  2,  'Pending',  NULL),
-- Job 7: Honda SH - kit trasmissione
(7,  18, 'Pending',  NULL),
-- Job 8: BMW X1 - ammortizzatori + convergenza
(8,  12, 'Assigned', 5),
(8,  10, 'Assigned', 5),
-- Job 9: Kawasaki Z750 - forcelle + pastiglie
(9,  17, 'Working',  2),
(9,  19, 'Working',  2),
-- Job 10: Jeep Renegade - batteria
(10, 8,  'Pending',  NULL),
-- Job 11: Toyota Yaris - tagliando base
(11, 1,  'Pending',  NULL),
-- Job 12: Honda CBR - gioco valvole + pulizia catena
(12, 16, 'Pending',  NULL),
(12, 14, 'Pending',  NULL),
-- Job 13: Renault Clio - cinghia distribuzione
(13, 6,  'Assigned', 3),
-- Job 14: BMW GS 1200 - tagliando + liquido freni
(14, 13, 'Assigned', 4),
(14, 15, 'Assigned', 4),
-- Job 15: Opel Corsa - foratura + convergenza
(15, 11, 'Pending',  NULL),
(15, 10, 'Pending',  NULL),
-- Job 16: Vespa GTS - gomma posteriore
(16, 22, 'Pending',  NULL),
-- Job 17: Peugeot 208 - alternatore
(17, 7,  'Assigned', 6),
-- Job 18: Suzuki GSX - cuscinetti sterzo
(18, 20, 'Pending',  NULL),
-- Job 19: Seat Ibiza - tagliando completo + clima
(19, 2,  'Pending',  NULL),
(19, 3,  'Pending',  NULL),
-- Job 20: Aprilia RS - coppia gomme
(20, 23, 'Pending',  NULL),
-- Job 21: Nissan Micra - tagliando base
(21, 1,  'Pending',  NULL),
-- Job 22: KTM Duke - pastiglie + pulizia catena
(22, 19, 'Pending',  NULL),
(22, 14, 'Pending',  NULL),
-- Job 23: Alfa Romeo Giulia - kit frizione
(23, 5,  'Pending',  NULL),
-- Job 24: Triumph Bonneville - revisione forcelle
(24, 17, 'Pending',  NULL),
-- Job 25: Skoda Fabia - cambio gomme + foratura
(25, 9,  'Pending',  NULL),
(25, 11, 'Pending',  NULL),
-- Job 26: Piaggio Liberty - tagliando moto
(26, 13, 'Pending',  NULL),
-- Job 27: Hyundai i20 - ammortizzatori
(27, 12, 'Pending',  NULL),
-- Job 28: Harley Sportster - trasmissione + pulizia catena
(28, 18, 'Pending',  NULL),
(28, 14, 'Pending',  NULL),
-- Job 29: Citroen C3 - batteria + igienizzazione
(29, 8,  'Pending',  NULL),
(29, 4,  'Pending',  NULL),
-- Job 30: Suzuki Burgman - gomma anteriore + posteriore
(30, 21, 'Pending',  NULL),
(30, 22, 'Pending',  NULL);