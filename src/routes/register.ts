import express, { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";
import userModel from "../db/userModel";

const registerRouter = express.Router();

//register endpoint
registerRouter.post("/", (req: Request, res: Response) => {
  //To hash a password

  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // instancia de usuario/documentos y obtener datos
      const user = new userModel({
        email: req.body.email,
        password: hashedPassword,
      });

      //guardar el usuario
      user
        .save()
        //devolver el resultado si el nuevo usuario se agrega a la base de datos con éxito
        .then((result) => {
          res.status(201).send({
            message: "User Created Succesfully",
            result,
          });
        })
        //error si el nuevo usuario no se agregó correctamente a la base de datos
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    //error si el hash de contraseña no es exitoso
    .catch((error) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        error,
      });
    });
});

export default registerRouter;
