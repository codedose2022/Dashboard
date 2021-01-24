import express from "express";

import {
  upLike,
  unLike,
  upDisLike,
  unDisLike,
} from "../controllers/likesDislikes.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/upLike", auth, upLike);
router.post("/unLike", auth, unLike);
router.post("/upDisLike", auth, upDisLike);
router.post("/unDisLike", auth, unDisLike);

export default router;
