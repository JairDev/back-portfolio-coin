import express, { Application, Request, Response } from "express";

import dbConnect from "./db/dbConnect";
import indexRouter from "./routes";
import registerRouter from "./routes/register";
import bodyParser from "body-parser";
const app: Application = express();

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

// app.post("/register", (req: Request, res: Response) => {
//   res.send("Hello register");
// });
app.use("/register", registerRouter);

export default app;
