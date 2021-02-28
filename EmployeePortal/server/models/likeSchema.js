import mongoose from "mongoose";
const schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
  {
    employeeId: {
      type: schema.Types.ObjectId,
      ref: "employeeSchema",
    },
    eventId: {
      type: schema.Types.ObjectId,
      ref: "eventsSchema",
    },
  },
  { timestamps: true }
);

const likes = mongoose.model("likes", likeSchema);

export default likes;
