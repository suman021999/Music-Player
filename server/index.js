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
      origin:  "http://localhost:5173", //process.env.Frontend_URL ||
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
