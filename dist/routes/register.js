"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../db/userModel"));
const registerRouter = express_1.default.Router();
//register endpoint
registerRouter.post("/", (req, res) => {
    //To hash a password
    bcrypt_1.default
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
        // instancia de usuario/documentos y obtener datos
        const user = new userModel_1.default({
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
exports.default = registerRouter;
