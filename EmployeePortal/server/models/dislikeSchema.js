import mongoose from "mongoose";
const schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
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

const dislikes = mongoose.model("dislikes", dislikeSchema);

export default dislikes;
