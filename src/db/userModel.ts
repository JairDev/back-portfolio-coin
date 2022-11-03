import mongoose, { Document } from "mongoose";

//Cada esquema se asigna a una colección MongoDB y
//define la forma de los documentos dentro de esa colección.

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
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
//crear una tabla o colección de usuario si ya no hay ninguna tabla con ese nombre
const Users = mongoose.model<IUser>("Users", UserSchema);

export default Users;
