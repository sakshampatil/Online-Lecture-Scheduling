import { Schema, model } from "mongoose";

const lectureSchema = new Schema({
  scheduledOn: {
    type: Date,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

const lectureModel = model("lectures", lectureSchema);

export default lectureModel;
