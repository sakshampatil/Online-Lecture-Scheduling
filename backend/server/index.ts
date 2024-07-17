import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import { routes } from "./routes";
import mongo from "mongoose";

const app: Application = express();
app.use(cors());

//connecting to mongoose
const connect = async () => {
  try {
    await mongo.connect(process.env.MONGO_CONNECT!);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};
connect();

const port = process.env.PORT || 3001;

//routes
routes(app);

const handleServerError = (err: Error) => {
  console.error(err);
};

//starting server
app.listen(port, () => {
  console.log(`Server is running on PORT = ${port}`);
});

process.on("uncaughtException", handleServerError);
