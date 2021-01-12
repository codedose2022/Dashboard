import express from 'express';

import {getEmployees,createEmployee,login,getProfile,editProfile,isTokenValid} from '../controllers/employee.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/getEmployees',auth,getEmployees);
router.post('/createEmployee',auth,createEmployee);
router.post('/login',login);
router.post('/profile',auth,getProfile);
router.post('/editProfile',editProfile);
router.post('/isTokenValid',isTokenValid);



export default router;