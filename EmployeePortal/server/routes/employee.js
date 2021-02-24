import express from "express";
import multer from "multer";
import {
  createEmployee,
  editProfile,
  getEmployees,
  getProfile,
  isTokenValid,
} from "../controllers/employee.js";
import {
  changePassword,
  getUserData,
  login,
  resetPassword,
  sendResetLink,
} from "../controllers/login.js";
import { fileFilter, storage } from "../controllers/uploadFiles.js";
import auth from "../middleware/auth.js";

const router = express.Router();
let upload = multer({ storage, fileFilter });

router.post("/getEmployees", auth, getEmployees);
router.post(
  "/createEmployee",
  auth,
  upload.single("selectedFile"),
  createEmployee
);
router.post("/login", login);
router.post("/profile", auth, getProfile);
router.post("/editProfile", auth, upload.single("selectedFile"), editProfile);
router.post("/isTokenValid", isTokenValid);
router.post("/changePassword", changePassword);
router.post("/getUserData", auth, getUserData);
router.post("/sendResetLink", sendResetLink);
router.post("/resetPassword", resetPassword);

export default router;
