"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const routes_1 = __importDefault(require("./routes"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const auth_1 = __importDefault(require("./auth"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
(0, dbConnect_1.default)();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", routes_1.default);
app.use("/register", register_1.default);
app.use("/login", login_1.default);
app.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});
app.get("/auth-endpoint", auth_1.default, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});
exports.default = app;
