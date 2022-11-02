import express, { Application, NextFunction, Request, Response } from "express";

import dbConnect from "./db/dbConnect";

import indexRouter from "./routes";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";

import auth from "./auth";
import bodyParser from "body-parser";

const app: Application = express();

dbConnect();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/free-endpoint", (req: Request, res: Response) => {
  res.json({ message: "You are free to access me anytime" });
});

app.get("/auth-endpoint", auth, (req: Request, res: Response) => {
  res.json({ message: "You are authorized to access me" });
});

export default app;
