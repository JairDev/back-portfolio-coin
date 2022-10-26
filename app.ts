const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");

const dbConnectApp = require("./src/db/dbConnect.ts");
const User = require("./src/db/userModel.ts");

dbConnectApp();

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("Hello world");
});

//register endpoint
app.post("/register", (request, response) => {
  //To hash a password

  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // instancia de usuario y obtener datos
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      //guardar el usuario
      user
        .save()
        //devolver el resultado si el nuevo usuario se agrega a la base de datos con éxito
        .then((result) => {
          response.status(201).send({
            message: "User Created Succesfully",
            result,
          });
        })
        //error si el nuevo usuario no se agregó correctamente a la base de datos
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    //error si el hash de contraseña no es exitoso
    .catch((error) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        error,
      });
    });
});

module.exports = app;
