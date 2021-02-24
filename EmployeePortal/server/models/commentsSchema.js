import mongoose from "mongoose";
const schema = mongoose.Schema;

const commentsSchema = mongoose.Schema(
  {
    employeeId: {
      type: schema.Types.ObjectId,
      ref: "employeeSchema",
    },
    eventId: {
      type: schema.Types.ObjectId,
      ref: "eventsSchema",
    },
    comments: String,
    employeeFirstName: String,
    employeeLastName: String,
    selectedFile: String,
  },
  { timestamps: true }
);

const comments = mongoose.model("comments", commentsSchema);

export default comments;
