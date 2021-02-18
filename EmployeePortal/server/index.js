import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

 
import Employees from './routes/employee.js';
import Events from './routes/events.js';
import likesDislikes from './routes/likeDislike.js';
import comments from './routes/comments.js';
import Polls from './routes/polls.js';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/employeeDetails',Employees);
app.use('/Events',Events);
app.use('/likesDislikes',likesDislikes);
app.use('/comments',comments);
app.use('/polls',Polls);



const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);


