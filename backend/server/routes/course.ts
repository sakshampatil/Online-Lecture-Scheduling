import { Router } from "express";
import { create, createLecture, getCourseById, list } from "../controllers/courses";
import { verifyToken } from "../middlewares/auth";
import upload from "../middlewares/multer";

const router = Router();

router.route("/create").post(verifyToken, upload.single("file"), create);
router.route("/list").get(verifyToken, list);
router.route("/getCourseById/:id").get(verifyToken, getCourseById);
router.route("/createLecture").post(verifyToken, createLecture);

export default router;
