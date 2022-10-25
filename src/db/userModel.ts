const mongoose = require("mongoose");

//Cada esquema se asigna a una colección MongoDB y
//define la forma de los documentos dentro de esa colección.

const UserSchema = new mongoose.Schema({
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

//crear una tabla o colección de usuario si ya no hay ninguna tabla con ese nombre
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
