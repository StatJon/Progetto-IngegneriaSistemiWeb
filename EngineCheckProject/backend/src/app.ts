import express, { Express } from "express"


import historyApiFallback from "connect-history-api-fallback"

const app: Express = express()
const port: number = 3000

app.use(historyApiFallback())

