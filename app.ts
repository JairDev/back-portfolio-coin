const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// login endpoint
app.post("/login", (request, response) => {
  //buscar el email para saber si existe
  User.findOne({ email: request.body.email })
    .then((user) => {
      //comparar la contraseña introducida con la contraseña hash en la base de datos
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // comprobar si la contraseña es correcta
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Password does not match",
            });
          }
          // si las contraseñas coinciden crear un token jwt aleatorio
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // la comparación de contraseñas no fue exitosa
        .catch((error) => {
          response.status(400).send({
            message: "Password does not match",
            error,
          });
        });
    })
    // la busqueda del correo electronico no fue exitosa
    .catch((error) => {
      response.status(404).send({
        message: "Email not found",
        error,
      });
    });
});

module.exports = app;
