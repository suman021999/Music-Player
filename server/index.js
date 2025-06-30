import express from "express"
import dotenv from "dotenv"
import MusicRouter from './router/play.route.js'
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import database from "./db/database.js";


const app=express()
dotenv.config()
database()

app.use(
    cors({
      origin: process.env.Frontend_URL || "http://localhost:5173",
      credentials: true,
    })
  );

app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use("/api/v1/music",MusicRouter)



const PORT=process.env.PORT || 3000


app.listen(PORT, () => console.log(`server run on ${PORT}`))
