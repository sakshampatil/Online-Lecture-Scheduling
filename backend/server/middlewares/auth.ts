import jwt, { JwtPayload } from "jsonwebtoken";
import { useErrorHandler, Unauthorized } from "../utils/errorHandler";
import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/types";

export const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new Unauthorized("Unauthorzied");
  }
  try {
    if (token.includes("Bearer")) {
      token = token.split(" ")[1];
    }
    console.log("JWT = ", token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    console.log("dec = ", decoded);
    req.user = (decoded as JwtPayload)?.userId as string;
    next();
  } catch (err) {
    next(err);
  }
};
