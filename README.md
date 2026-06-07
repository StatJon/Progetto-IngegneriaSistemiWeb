# Istruzioni setup

- Clonare la repository git `git clone https://github.com/StatJon/Progetto-IngegneriaSistemiWeb.git`
- Tramite terminale, aggiornare le dipendenze backend da posizione ./EngineCheckProject/backend con comando `npm i`
- Tramite terminale, aggiornare le dipendenze frontend da posizione ./EngineCheckProject/frontend con comando `npm i`
- In ./EngineCheckProject/backend/ rinominare .env.example in .env (per far funzionare correttamente le operazioni di auth con JWT)
- In XAMPP, avviare APACHE e MySQL
- In XAMPP\MySql (`http://localhost/phpmyadmin`), eseguire in ordine le query presenti nei seguenti file:
    - ./EngineCheckProject/backend/sql/EngineCheck.sql
    - ./EngineCheckProject/backend/sql/EngineCheckDumpNew.sql
- Tramite terminale, avviare il backend da posizione ./EngineCheckProject/backend con comando `npm run dev`
- Tramite terminale, avviare il frontend da posizione ./EngineCheckProject/frontend con comando `npm run dev`
- Accedere alla pagina tramite browser a `http://localhost:5173/` (backend raggiungibile a `http://localhost:3000/`)

---

# Credenziali d'esempio per esplorare il sito
*Nota: tutte le password sono `pass123`*

Cliente:
*Da pagina di login utente*
 - email: giulia.romani@email.it
 - pass: pass123

Dipendente ("Worker"):
*Da pagina di login dipendente*
- num.badge: 2
- pass: pass123

Admin:
*Da pagina di login dipendente*
- num.badge: 1
- pass: pass123
