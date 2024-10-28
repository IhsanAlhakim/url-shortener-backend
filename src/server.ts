import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTiON_STRING!;

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(PORT, () => {
      console.log("Sever Running on Port: " + PORT);
    });
  })
  .catch(console.error);
