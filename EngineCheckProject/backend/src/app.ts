import express, { Express } from "express"
import customerRouter from "./routes/customer-router"
import employeeRouter from "./routes/employee-router"
import jobRouter from "./routes/job-router"
import serviceRouter from "./routes/service-router"

import historyApiFallback from "connect-history-api-fallback"

const app: Express = express()
const port: number = 3000

app.use(historyApiFallback())
app.use(express.static("public")) //per risorse in public

//routing api
app.use(customerRouter)
app.use(employeeRouter)
app.use(jobRouter)
app.use(serviceRouter)

//fallback 404
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

//start express
app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
