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
    phoneNumber:Number,
    dob:Date,
    email:String,
    password:{
        type: String,
        default: passwordHash,
    },
    dependance:Object,
    hobbies :[String],
    otherSkills : [String],
    dietPath:String,  
    disableInd:{
        type: String,
        default: 'N',
    }
});

const employeeDetails = mongoose.model('employeeDetails', employeeSchema);

export default employeeDetails;


