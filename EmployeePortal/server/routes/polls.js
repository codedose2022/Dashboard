import express from "express";
import multer from "multer";
import {
  addPoll,
  createPolls,
  deletePolls,
  getPolls,
} from "../controllers/polls.js";
import { fileFilter, storage } from "../controllers/uploadFiles.js";
import auth from "../middleware/auth.js";

const router = express.Router();
let upload = multer({ storage, fileFilter });
router.post("/getPolls", auth, getPolls);
router.post("/createPolls", auth, upload.array("image"), createPolls);
router.post("/deletePolls", auth, deletePolls);
router.post("/addPolls", auth, addPoll);

export default router;
