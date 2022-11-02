"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    //@ts-ignore
    email: {
        type: String,
        require: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        require: [true, "Please provide a password!"],
        unique: false,
    },
});
// //@ts-ignore
const Users = mongoose_1.default.model("Users", UserSchema);
//crear una tabla o colección de usuario si ya no hay ninguna tabla con ese nombre
// module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
// export default mongoose.model("Users", UserSchema);
exports.default = Users;
