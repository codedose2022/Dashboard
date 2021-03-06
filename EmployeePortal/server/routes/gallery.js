import express from "express";
import multer from "multer";
import { getAlbums ,createAlbums,checkAlbum} from "../controllers/gallery.js";
import { fileFilter, storage } from "../controllers/uploadFiles.js";
import auth from "../middleware/auth.js";

const router = express.Router();

let upload = multer({ storage, fileFilter });

router.get("/getAlbums", auth, getAlbums);
router.post("/createAlbums", checkAlbum, createAlbums);


export default router;
