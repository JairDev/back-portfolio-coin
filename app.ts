const dbConnectApp = require("./src/db/dbConnect.ts");
const bcrypt = require("bcrypt");
const User = require("./db/userModel");

dbConnectApp();
