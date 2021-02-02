import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

import * as dotenv from 'dotenv';
dotenv.config();

const salt = await bcryptjs.genSalt();
const passwordHash = await bcryptjs.hash('Welcome123',salt)

const employeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    employeeCode: String,
    department:String,
    designation: String,
    division: String,
    dateOfHire:Date,
    deskPhone:Number,
    workMobile:Number,
    employeeStatus:String,
    phoneNumber:Number,
    nationality:String,
    gender:String,
    maritalStatus:String,
    dob:Date,
    email:String,
    password:{
        type: String,
        default: passwordHash,
    },
    dependenceDetails:Object,
    hobbies :[String],
    dietPath:String,  
    selectedFile: String,
    disableInd:{
        type: String,
        default: 'N',
    }
},
{timestamps: true}
);

const employeeDetails = mongoose.model('employeeDetails', employeeSchema);

export default employeeDetails;


