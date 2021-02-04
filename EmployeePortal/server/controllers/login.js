import express from "express";
import employeeDetails from '../models/employeeSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const INVALID_PASSWORD = '12';

export const changePassword = async (req,res) => {   
  const {email,password,newPassword, confirmPassword} = req.body;
  let salt = '';
  let passwordHash ='';

  try {
    const user = await employeeDetails.findOne({"email":email})
    ;
    const isMatch = await bcryptjs.compare(password,user.password);
    let responseMessages = {
      messages:{
          status:'',
          message:''
      },
  }
    if(!isMatch){
      responseMessages.messages.message= 'Invalid Credentials';
      responseMessages.messages.status = INVALID_PASSWORD;
      return res.status(200).json(responseMessages);
    }
    if(newPassword!=confirmPassword){
      responseMessages.messages.message= 'new password entered does not match with the confirm password';
      responseMessages.messages.status = '13';
      return res.status(200).json(responseMessages);
    }
      
      salt = await bcryptjs.genSalt();
      passwordHash = await bcryptjs.hash(confirmPassword,salt)
      await employeeDetails.updateOne({
        'email': email
        } , {
          $set : {password :passwordHash }});
      responseMessages.messages.message= 'Password has been updated';
      responseMessages.messages.status = '14';
      return res.status(200).json(responseMessages);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}



export default router;