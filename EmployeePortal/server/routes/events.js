import express from "express";
import multer from "multer";
import {
  approval,
  createEvents,
  deleteEvents,
  editEvents,
  getEvents,
} from "../controllers/events.js";
import { fileFilter, storage } from "../controllers/uploadFiles.js";
import auth from "../middleware/auth.js";

const router = express.Router();

let upload = multer({ storage, fileFilter });

router.post("/getEvents", auth, getEvents);
router.post("/createEvents", auth, upload.single("img"), createEvents);
router.post("/editEvents", auth, upload.single("img"), editEvents);
router.post("/deleteEvents", auth, deleteEvents);
router.post("/approval", auth, approval);

export default router;
