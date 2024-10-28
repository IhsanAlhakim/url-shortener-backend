require("dotenv").config();
import app from "./app";
import mongoose, { ConnectOptions } from "mongoose";

const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "";

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
