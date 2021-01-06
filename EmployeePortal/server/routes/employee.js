import express from 'express';

import {getEmployees,createEmployee,login,getProfile,editProfile,isTokenValid} from '../controllers/employee.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/getDetails',getEmployees);
router.post('/createEmployee',createEmployee);
router.post('/login',login);
router.post('/profile',auth,getProfile);
router.post('/editProfile',editProfile);
router.post('/isTokenValid',isTokenValid);



export default router;