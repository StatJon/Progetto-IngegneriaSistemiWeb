import "dotenv/config"
import express, { Express } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import historyApiFallback from "connect-history-api-fallback"

import adminRouter from "./routes/admin-router.js"
import authRouter from "./routes/auth-router.js"
import bookingRouter from "./routes/booking-router.js"
import customerRouter from "./routes/customer-router.js"
import jobRouter from "./routes/job-router.js"
import serviceRouter from "./routes/service-router.js"
import testingRouter from "./routes/testing-router.js" //da rimuovere per final release

const app: Express = express()
const port: number = 3000

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public")) //per eventuali risorse in public, non usato, valutare se togliere

//routing api
app.use(adminRouter)
app.use(authRouter)
app.use(bookingRouter)
app.use(customerRouter)
app.use(jobRouter)
app.use(serviceRouter)

//history fallback
app.use(historyApiFallback())

//404 fallback
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).json({ message: "Ohibo... Pagina non trovata" })
})

//start express
app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
