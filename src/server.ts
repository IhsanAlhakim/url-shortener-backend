import dotenv from "dotenv";
import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTiON_STRING || "";

console.log("Connection String:", MONGO_CONNECTION_STRING);

if (
  !MONGO_CONNECTION_STRING.startsWith("mongodb://") &&
  !MONGO_CONNECTION_STRING.startsWith("mongodb+srv://")
) {
  throw new Error("Invalid MongoDB connection string.");
}

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(PORT, () => {
      console.log("Sever Running on Port: " + PORT);
    });
  })
  .catch(console.error);
