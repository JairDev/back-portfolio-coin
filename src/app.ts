import express, { Application, Request, Response } from "express";

import dbConnect from "./db/dbConnect";

import indexRouter from "./routes";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";

import bodyParser from "body-parser";

const app: Application = express();

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

export default app;
