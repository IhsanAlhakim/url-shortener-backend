import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { HttpError } from "./errors/http-error";
import * as UrlController from "./controller/url";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/:urlId", UrlController.getOriURL);

app.post("/short", UrlController.shortenUrl);

app.use((req, res, next) => {
  next(new HttpError(404, "Endpoint Not Found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (error instanceof HttpError) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
