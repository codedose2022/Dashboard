import express from "express";
import Comments from "../models/commentsSchema.js";
const router = express.Router();

export const addComments = async (req, res) => {
  try {
    let responseData = {
      status: "",
      message: "",
    };
    const comments = new Comments(req.body);
    await comments.save();
    responseData.status = "23";
    responseData.message = "comments Added";
    return res.status(200).json(responseData);
  } catch (error) {
    responseData.message = "Unable to add comments";
    res.status(404).json(responseData);
  }
};

export default router;
