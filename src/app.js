import express from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.routes.js";
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(router)


const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(chalk.blue(`Servidor rodando na porta`) + chalk.magenta(` ${port}`))
})