import express from "express";
import employeeDetails from '../models/employeeSchema.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const INVALID_EMAIL = '10';
const LOGIN_SUCCESSFUL = '11';
const INVALID_PASSWORD = '12';
const USER_EXISTING = '13';
const USER_CREATION_SUCCESS = '14';

export const getEmployees = async (req,res) => { 
     try {
        const employees = await employeeDetails.find({"disableInd" : 'N'},{password:0});
        return res.status(200).json(employees);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEmployee = async (req,res) => { 
    const employee = new employeeDetails(req.body);
    const {email} = req.body;
    let responseMessages = {
        messages:{
            status:'',
            message:''
        },
        employees:{}
    }
    
    try {
        const existingUser = await employeeDetails.findOne({email : email})
        if(existingUser){
            responseMessages.messages.message= 'An account with this email exists';
            responseMessages.messages.status = USER_EXISTING;
            return res.status(200).json(responseMessages);
        }
        else{
            await employee.save();
            const employees = await employeeDetails.find({"disableInd" : 'N'},{password:0});
            responseMessages.messages.message= 'User Creation Successful';
            responseMessages.messages.status = USER_CREATION_SUCCESS;
            responseMessages.employees = employees;
            return res.status(200).json(responseMessages);
        }
      
   } catch (error) {
       console.log('in error');
       res.status(404).json({ message: error.message });
   }
}

export const getProfile = async (req,res) => { 
    
    try {
        const employee = await employeeDetails.findOne({"_id" : req.id},{password:0});
        return res.status(200).json(employee);
   } catch (error) {
       res.status(404).json({ message: error.message });
   }
 }

export const isTokenValid = async (req,res) => { 
  
    try {
     
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        if(!verified) return res.json(false);
        console.log(verified)

        const user = await employeeDetails.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }
 }



 export const editProfile = async (req,res) => { 
    
    try {
        const entries = Object.keys(req.body)
        console.log(entries)
        const updates = {}
            for (let i = 0; i < entries.length; i++) {
            updates[entries[i]] = Object.values(req.body)[i]
            }
            await employeeDetails.updateOne({
            "_id": req.body._id
            } , {
            $set: updates
            } ,
            function (err , success) {
            if (err) throw (err);
            else {
               
            res.send({
            msg: "update success"
            })
            }
            })

   } catch (error) {
       res.status(404).json({ message: error.message });
   }
 }


export const login = async (req,res) => {   
    const {email,password} = req.body;
    let response;
    let responseData = { 
        userData:{
            firstName :'',
            lastName:'',
            id:'',
            division:''
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




export default router;
