import express, { json } from 'express';
import { animalsRouter } from './routes/animals.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable("x-powered-by")

app.use("/animals", animalsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server en el puerto: http://localhost:${PORT}`);
})