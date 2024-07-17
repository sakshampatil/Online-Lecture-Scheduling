import { NextFunction, Response, Request } from "express";
import userModel from "../models/user";
import jwt from "jsonwebtoken";
import { responseHandler } from "../utils/responseHandler";
import { BadRequest, Unauthorized } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { IGetUserAuthInfoRequest } from "../types/types";
import courseModel from "../models/course";

export const create = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    let body = req.body;
    console.log("BODY = ", req.body);
    console.log("Image = ", req.file);
    //checking the incoming data
    if (!body.name || !body.level || !body.description || !req.file) {
      throw new BadRequest("Insufficient Data");
    }

    //creating post
    body.image = `http://localhost:3000/file/${req.file.filename}`;
    const post = await courseModel.create(body);

    res.send({
      post: post,
    });
  } catch (error) {
    next(error);
  }
};

export const createInstructor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body = req.body;
    //checking the incoming data
    if (!body.email) {
      throw new BadRequest("Email is required");
    }

    if (!body.username) {
      throw new BadRequest("InstructorName is required");
    }
    if (!body.password || body.password.length < 8) {
      throw new BadRequest("Password is required");
    }

    //checking if user already exists
    const existingUser = await userModel.findOne({
      email: body.email,
    });
    if (existingUser) {
      throw new BadRequest("Instructor already exists");
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    body.role = "instructor";
    //creating user
    const user = await userModel.create(body);

    res.send({
      instructorId: user._id,
      instructorName: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};
