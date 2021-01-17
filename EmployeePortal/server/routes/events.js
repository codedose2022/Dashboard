import express from 'express';

import {getEvents,createEvents,editEvents,deleteEvents} from '../controllers/events.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/getEvents',auth,getEvents);
router.post('/createEvents',auth,createEvents);
router.post('/editEvents',auth,editEvents);
router.post('/deleteEvents',auth,deleteEvents);

export default router;