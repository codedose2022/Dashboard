import express from "express";
import multer from "multer";
import {
  getAlbums,
  createAlbums,
  checkAlbum,
  deleteAlbum,
  deleteImage,
  addMoreImages,
  getAlbumFolder
} from "../controllers/gallery.js";
import { fileFilter, storage } from "../controllers/uploadFiles.js";
import auth from "../middleware/auth.js";

const router = express.Router();

let upload = multer({ storage, fileFilter });

router.get("/getAlbums", auth, getAlbums);
//pass albumTitle in request header and image as formData in request body
router.post(
  "/createAlbums",
  auth,
  checkAlbum,
  upload.array("image"),
  createAlbums
);
//pass _id in request body 
router.post("/deleteAlbum", auth, deleteAlbum);
//pass album _id and image name in request body 
router.post("/deleteImage", auth, deleteImage);
//pass albumFolder in request header and image as formData in request body
router.post("/addMoreImages",auth,getAlbumFolder, upload.array("image"),addMoreImages);

export default router;
