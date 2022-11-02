import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //obtener el token del encabezado de autorización
    const token = await req?.headers?.authorization?.split(" ")[1];
    //comprobar si el token generado coincide con la cadena
    //@ts-ignore
    const decodeToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodeToken;
    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export default auth;
