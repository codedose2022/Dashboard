import express from "express";
import employeeDetails from "../models/employeeSchema.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import fs from 'fs';
dotenv.config();

const router = express.Router();

const USER_EXISTING = "13";
const USER_CREATION_SUCCESS = "14";
const USER_UPDATE_SUCCESS = "15";

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeDetails.find(
      { disableInd: "N" },
      { password: 0 }
    );
    return res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const selectedFile = req.file ? req.file.filename: '';

  const {
    firstName,
    lastName,
    employeeCode,
    department,
    designation,
    division,
    dateOfHire,
    deskPhone,
    workMobile,
    employeeStatus,
    phoneNumber,
    nationality,
    gender,
    maritalStatus,
    dob,
    email,
    hobbies,
    dietPath,
  } = req.body;
  const dependenceDetails = JSON.parse(req.body.dependenceDetails);
  const data = {
    firstName,
    lastName,
    employeeCode,
    department,
    designation,
    division,
    dateOfHire,
    deskPhone,
    workMobile,
    employeeStatus,
    phoneNumber,
    nationality,
    gender,
    maritalStatus,
    dob,
    email,
    dependenceDetails,
    hobbies,
    dietPath,
    selectedFile,
  };

  const employee = new employeeDetails(data);

  let responseMessages = {
    messages: {
      status: "",
      message: "",
    },
    employees: {},
  };

  try {
    const existingUser = await employeeDetails.findOne({ email: email });
    if (existingUser) {
      responseMessages.messages.message = "An account with this email exists";
      responseMessages.messages.status = USER_EXISTING;
      return res.status(200).json(responseMessages);
    } else {
      await employee.save();
      const employees = await employeeDetails.find(
        { disableInd: "N" },
        { password: 0 }
      );
      responseMessages.messages.message = "User Creation Successful";
      responseMessages.messages.status = USER_CREATION_SUCCESS;
      responseMessages.employees = employees;
      return res.status(200).json(responseMessages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const employee = await employeeDetails.findOne(
      { _id: req.id },
      { password: 0 }
    );
    return res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const isTokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await employeeDetails.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editProfile = async (req, res) => {
  const selectedFile = req.file? req.file.filename :req.body.selectedFile;
  let responseMessages = {
    messages: {
      status: "",
      message: "",
    },
    employees: {},
  };
  try {
    const {
      firstName,
      lastName,
      employeeCode,
      department,
      designation,
      division,
      dateOfHire,
      deskPhone,
      workMobile,
      employeeStatus,
      phoneNumber,
      nationality,
      gender,
      maritalStatus,
      dob,
      email,
      hobbies,
      dietPath,
      disableInd,
      _id,
    } = req.body;
    const dependenceDetails = JSON.parse(req.body.dependenceDetails);
    const data = {
      firstName,
      lastName,
      employeeCode,
      department,
      designation,
      division,
      dateOfHire,
      deskPhone,
      workMobile,
      employeeStatus,
      phoneNumber,
      nationality,
      gender,
      maritalStatus,
      dob,
      email,
      dependenceDetails,
      hobbies,
      dietPath,
      selectedFile,
      disableInd,
      _id,
    };

    await employeeDetails.findOne({
      _id: data._id,
    }).then((employee) => {
      if(employee.selectedFile !== selectedFile){
        if(employee.selectedFile!==''){
          fs.unlinkSync('images/'+ employee.selectedFile);
        }
        
      }
    });

    const entries = Object.keys(data);
    const updates = {};
    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(data)[i];
    }
    await employeeDetails.updateOne(
      {
        _id: data._id,
      },
      {
        $set: updates,
      }
    );

    const employees = await employeeDetails.find(
      { disableInd: "N" },
      { password: 0 }
    );
    responseMessages.messages.message = "Details Successfully Updated";
    responseMessages.messages.status = USER_UPDATE_SUCCESS;
    responseMessages.employees = employees;
    return res.status(200).json(responseMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
