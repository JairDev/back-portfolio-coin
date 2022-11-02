import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/userModel";

const loginRouter = express.Router();

loginRouter.post("/", (req: Request, res: Response) => {
  // console.log(req.body.email);
  User
    //comprobar si el correo electrónico existe
    //@ts-ignore
    .findOne({ email: req.body.email })
    .orFail()
    .then((user) => {
      //comparar contraseña introducida con la contraseña hash almacenada en al base de datos
      bcrypt
        //@ts-ignore
        .compare(req.body.password, user?.password)
        .then((passwordCheck) => {
          //Comprobar si las contraseñas coinciden
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Password does not match",
            });
          }
          //si la contraseña coincide
          //crear token aleatorio
          const token = jwt.sign(
            {
              userId: user?._id,
              userEmail: user?.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          // devolver mensaje exitoso con el token creado
          res.status(200).send({
            message: "Login Successful",
            email: user?.email,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Password does not matchhh",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(404).send({
        message: "Email not found",
        error,
      });
    });
});

export default loginRouter;
