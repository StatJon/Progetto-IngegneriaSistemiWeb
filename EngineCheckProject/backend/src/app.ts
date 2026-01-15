import express, { Express } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import historyApiFallback from "connect-history-api-fallback"

import customerRouter from "./routes/customer-router"
import employeeRouter from "./routes/employee-router"
import jobRouter from "./routes/job-router"
import serviceRouter from "./routes/service-router"
import testingRouter from "./routes/testing-router"

const app: Express = express()
const port: number = 3000

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public")) //per risorse in public

//routing api
app.use()
app.use(customerRouter)
app.use(employeeRouter)
app.use(jobRouter)
app.use(serviceRouter)
app.use(testingRouter)

//history fallback
app.use(historyApiFallback())

//404 fallback
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

//start express
app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
