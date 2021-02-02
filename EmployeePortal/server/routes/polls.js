import express from 'express';

import {getPolls,createPolls,deletePolls,addPoll} from '../controllers/polls.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/getPolls',auth,getPolls);
router.post('/createPolls',auth,createPolls);
router.post('/deletePolls',auth,deletePolls);
router.post('/addPolls',auth,addPoll);

export default router;