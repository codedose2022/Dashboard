import express from "express";
import employeeDetails from '../models/employeeSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

export const resetPassword = async (req,res) => {   
  const {email,password,newPassword, oldPassword} = req.body;
 
}




export default router;