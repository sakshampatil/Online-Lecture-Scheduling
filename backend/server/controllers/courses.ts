import { NextFunction, Response, Request } from "express";
import userModel from "../models/user";
import jwt from "jsonwebtoken";
import { responseHandler } from "../utils/responseHandler";
import { BadRequest, Unauthorized } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import { IGetUserAuthInfoRequest } from "../types/types";
import courseModel from "../models/course";
import lectureModel from "../models/lecture";

export const create = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    let body = req.body;

    //checking the incoming data
    if (!body.name || !body.level || !body.description || !req.file) {
      throw new BadRequest("Insufficient Data");
    }

    //creating post
    body.image = `http://localhost:3000/file/${req.file.filename}`;
    const course = await courseModel.create(body);

    res.send({
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

export const list = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    let params = req.query;
    let filter = {};
    if (params.search) {
      filter = {
        content: { $regex: params.search, $options: "i" },
      };
    }

    const coursesList = await courseModel.find(filter);

    res.send({
      courses: coursesList,
    });
  } catch (error) {
    next(error);
  }
};

export const createLecture = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let body = req.body;

    //checking the incoming data
    if (!body.scheduledOn || !body.courseId || !body.instructorId) {
      throw new BadRequest("Insufficient Data");
    }

    //creating post
    const lec = await lectureModel.create(body);

    res.send({
      lecture: lec,
    });
  } catch (error) {
    next(error);
  }
};
