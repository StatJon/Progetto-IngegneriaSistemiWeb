# Istruzioni setup

- Scaricare il git
- In XAMPP, avviare APACHE e MySQL
- In MySql, eseguire in ordine le sequenti query
    - ./EngineCheckProject/backend/sql/EngineCheck.sql
    - ./EngineCheckProject/backend/sql/EngineCheckDumpNew.sql
- In ./EngineCheckProject/backend/ rinominare .env.example in .env
- Tramite terminale, avviare il backend da posizione ./EngineCheckProject/backend con comando `npm run dev`
- Tramite terminale, avviare il frontend da posizione ./EngineCheckProject/frontend con comando `npm run dev`

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

Admin
*Da pagina di login dipendente*
- num.badge: 1
- pass: pass123



* Link: https://www.figma.com/design/a2vk6vfzNOL8sqM5RMt5GV/Progetto-web?node-id=0-1&t=eUldEwrBRyvkYhQ7-1
