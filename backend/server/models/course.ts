import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const courseModel = model("courses", courseSchema);

export default courseModel;
