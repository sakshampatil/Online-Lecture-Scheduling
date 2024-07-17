import { NextFunction, Response, Request } from "express";
import userModel from "../models/user";
import jwt from "jsonwebtoken";
import { responseHandler } from "../utils/responseHandler";
import { BadRequest, Unauthorized } from "../utils/errorHandler";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body = req.body;
    //checking the incoming data
    if (!body.email) {
      throw new BadRequest("Email is required");
    }
    if (!body.password || body.password.length < 8) {
      throw new BadRequest("Password is required");
    }

    //checking if user exist
    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      throw new Unauthorized("User does not exist");
    }

    //comparing the password
    const result = await bcrypt.compare(body.password, user.password);
    if (!result) {
      throw new Unauthorized("Incorrect password");
    }

    //generating a token
    const token = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET_KEY!
    );

    res.send({
      token: token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
