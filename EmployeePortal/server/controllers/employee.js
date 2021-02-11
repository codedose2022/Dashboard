import express from "express";
import employeeDetails from '../models/employeeSchema.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const USER_EXISTING = '13';
const USER_CREATION_SUCCESS = '14';
const USER_UPDATE_SUCCESS = '15';

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

        const user = await employeeDetails.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }
 }



 export const editProfile = async (req,res) => { 
    let responseMessages = {
        messages:{
            status:'',
            message:''
        },
        employees:{}
    }
    try {
        const entries = Object.keys(req.body)
        const updates = {}
            for (let i = 0; i < entries.length; i++) {
            updates[entries[i]] = Object.values(req.body)[i]
            }
            await employeeDetails.updateOne({
            "_id": req.body._id
            } , {
            $set: updates
            } )
         
                const employees = await employeeDetails.find({"disableInd" : 'N'},{password:0});
                responseMessages.messages.message= 'Details Successfully Updated';
                responseMessages.messages.status = USER_UPDATE_SUCCESS;
                responseMessages.employees = employees;
                return res.status(200).json(responseMessages);
          
           

   } catch (error) {
       res.status(404).json({ message: error.message });
   }
 }




export default router;
