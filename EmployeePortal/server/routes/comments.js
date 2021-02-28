import express from "express";

import { addComments } from "../controllers/comments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addComments", auth, addComments);

export default router;
