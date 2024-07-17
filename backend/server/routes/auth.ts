import { Router } from "express";
import { createInstructor, login } from "../controllers/auth";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.route("/login").post(login);
router.route("/createInstructor").post(verifyToken, createInstructor);

export default router;
