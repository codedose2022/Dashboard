import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const albumTitle = req.header("albumTitle");
    const albumFolder = req.header("albumFolder");
    if(albumTitle){
     let album_folder = albumTitle.replace(/\s/g, "");
     req.body.albumFolder = album_folder
      cb(null, `images/Gallery/${album_folder}`);
    }
    if(albumFolder){
      cb(null, `images/Gallery/${albumFolder}`);
    }
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

export const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

