import { Request } from "express";
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "instructor";
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: string;
}
