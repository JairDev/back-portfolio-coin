"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({
    path: "/home/alfredo/Documentos/projects/back-coin-api/src/.env",
});
// import { config } from "dotenv";
const app_1 = __importDefault(require("./app"));
// config({ path: "/home/alfredo/Documentos/projects/back-coin-api/src/.env" });
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server is listening on  port ${PORT}`);
});
