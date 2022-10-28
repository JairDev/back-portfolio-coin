import express, { Application } from "express";
import indexRouter from "./routes";

const app: Application = express();

app.use("/", indexRouter);

export default app;
