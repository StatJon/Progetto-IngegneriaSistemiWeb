import mysql from "mysql2/promise"

export const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "EngineCheck",
})
//Nota: Cambiamenti in tsconfig.json per permettere await top-level

/*
Reference:
https://github.com/gtumedei/vue-express-auth
https://sidorares.github.io/node-mysql2/docs
*/