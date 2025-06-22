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
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

app.use(express())
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use("/api/v1/user",MusicRouter)


const PORT=process.env.PORT||3000 

app.listen(console.log(`server run on ${PORT}`))

