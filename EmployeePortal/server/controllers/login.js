import express from "express";
import employeeDetails from "../models/employeeSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const INVALID_PASSWORD = "12";
const INVALID_EMAIL = '10';
const LOGIN_SUCCESSFUL = '11';


export const login = async (req,res) => {   
  const {email,password} = req.body;
  let response;
  let responseData = { 
      userData:{
          firstName :'',
          lastName:'',
          id:'',
          division:'',
          emailId : ''
      }, 
      token  :''  
  }
  let responseMessages = {
      messages:{
          status:'',
          message:''
      },
  }
  try {
      const user = await employeeDetails.findOne({"email":email})
          if(!user){
              responseMessages.messages.message= 'No account with this email has been registered';
              responseMessages.messages.status = INVALID_EMAIL;
              return res.status(200).json(responseMessages);
          } 
          const isMatch = await bcryptjs.compare(password,user.password);
          const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
          if(!isMatch){
              responseMessages.messages.message= 'Invalid Credentials';
              responseMessages.messages.status = INVALID_PASSWORD;
              return res.status(200).json(responseMessages);
          }

              responseData.userData.firstName = user.firstName;
              responseData.userData.lastName = user.lastName;
              responseData.userData.id = user._id;
              responseData.userData.division =user.division;
              responseData.userData.emailId = user.email;
              responseMessages.messages.message= 'Login Success';
              responseMessages.messages.status = LOGIN_SUCCESSFUL;
              responseData.token = token;
              response = Object.assign(responseData, responseMessages);
              return res.status(200).json(response);   
      }
     
 catch (error) {
  return res.status(404).json({ message: error.message });
 }
}



export const changePassword = async (req, res) => {
  const { email, password, newPassword, confirmPassword } = req.body;
  let salt = "";
  let passwordHash = "";

  try {
    const user = await employeeDetails.findOne({ email: email });
    const isMatch = await bcryptjs.compare(password, user.password);
    let responseMessages = {
      messages: {
        status: "",
        message: "",
      },
    };
    if (!isMatch) {
      responseMessages.messages.message = "Invalid Credentials";
      responseMessages.messages.status = INVALID_PASSWORD;
      return res.status(200).json(responseMessages);
    }
    if (newPassword != confirmPassword) {
      responseMessages.messages.message =
        "new password entered does not match with the confirm password";
      responseMessages.messages.status = "13";
      return res.status(200).json(responseMessages);
    }

    salt = await bcryptjs.genSalt();
    passwordHash = await bcryptjs.hash(confirmPassword, salt);
    await employeeDetails.updateOne(
      {
        email: email,
      },
      {
        $set: { password: passwordHash },
      }
    );
    responseMessages.messages.message = "Password has been updated";
    responseMessages.messages.status = "14";
    return res.status(200).json(responseMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { token } = req.body;
  let responseData = {
    userData: {},
    token: token,
  };
  let responseMessages = {
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    const token = req.header("x-auth-token");
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(responseData);
    }
    const user = await employeeDetails.findById(verified.id);
    if (user) {
      responseData.userData.firstName = user.firstName;
      responseData.userData.lastName = user.lastName;
      responseData.userData.id = user._id;
      responseData.userData.division = user.division;
      responseData.userData.emailId = user.email;
      responseData.token = token;
      responseMessages.messages.message = "Login Success through token";
      responseMessages.messages.status = "11";
    }
    return res.json(responseData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default router;
