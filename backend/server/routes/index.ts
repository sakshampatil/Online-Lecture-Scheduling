import express, { Application, Response, Request, NextFunction } from "express";
import { useErrorHandler } from "../utils/errorHandler";
import cookieParser from "cookie-parser";

import auth from "./auth";
import course from "./course";

export const routes = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/file", express.static("./uploads"));
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/course", course);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    useErrorHandler(err, res);
  });
};
