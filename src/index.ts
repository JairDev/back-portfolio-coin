import { config } from "dotenv";
import app from "./app";

config({ path: "/home/alfredo/Documentos/projects/back-coin-api/src/.env" });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on  port ${PORT}`);
});
