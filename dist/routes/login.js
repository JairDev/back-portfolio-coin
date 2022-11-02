"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../db/userModel"));
const loginRouter = express_1.default.Router();
loginRouter.post("/", (req, res) => {
    // console.log(req.body.email);
    userModel_1.default
        //comprobar si el correo electrónico existe
        //@ts-ignore
        .findOne({ email: req.body.email })
        .orFail()
        .then((user) => {
        //comparar contraseña introducida con la contraseña hash almacenada en al base de datos
        bcrypt_1.default
            //@ts-ignore
            .compare(req.body.password, user === null || user === void 0 ? void 0 : user.password)
            .then((passwordCheck) => {
            //Comprobar si las contraseñas coinciden
            if (!passwordCheck) {
                return res.status(400).send({
                    message: "Password does not match",
                });
            }
            //si la contraseña coincide
            //crear token aleatorio
            const token = jsonwebtoken_1.default.sign({
                userId: user === null || user === void 0 ? void 0 : user._id,
                userEmail: user === null || user === void 0 ? void 0 : user.email,
            }, "RANDOM-TOKEN", { expiresIn: "24h" });
            // devolver mensaje exitoso con el token creado
            res.status(200).send({
                message: "Login Successful",
                email: user === null || user === void 0 ? void 0 : user.email,
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
exports.default = loginRouter;
