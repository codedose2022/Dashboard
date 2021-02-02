import express from "express";
import Polls from '../models/pollsSchema.js';
const router = express.Router();

const POLLS_CREATION_SUCCESS = '30';
const POLLS_DELETION_SUCCESS = '31';
const VOTE_SUCCESS='32';
const VOTE_DUPLICATE='33';
const MIN_TWO_OPTION_REQ='34';

export const getPolls = async (req, res) => {

    try {
        const polls = await Polls.find();
        return res.status(200).json(polls);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPolls = async (req, res) => {
   
    let responseMessages = {
        messages:{
            status:'',
            message:''
        },
        polls:{}
    }
    
    const poll = new Polls(req.body);
    
    try {
            if(poll.options.length<2)
            {
              responseMessages.messages.message= 'Minimum two options required to create the poll';
              responseMessages.messages.status = MIN_TWO_OPTION_REQ;
              return res.status(200).json(responseMessages);
            }
            else 
            {
            await poll.save();
            const polls = await Polls.find();
            responseMessages.messages.message= 'Poll Creation Successful';
            responseMessages.messages.status = POLLS_CREATION_SUCCESS;
            responseMessages.polls = polls;
            return res.status(200).json(responseMessages);
            }
   } catch (error) {
       res.status(404).json({ message: error.message });
   }
}



export const deletePolls = async (req, res) => {
  let responseMessages = {
    polls: {},
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    await Polls.findByIdAndRemove(req.body._id);
    responseMessages.messages.message = "Poll Deleted Successfully.";
    responseMessages.messages.status = POLLS_DELETION_SUCCESS;
    const polls = await Polls.find();
    responseMessages.polls = polls;
    return res.status(200).send(responseMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPoll = async (req, res) => {
  let responseMessages = {
    polls: {},
    messages: {
      status: "",
      message: "",
    },
  };
   const {poll_Id,option_Id,employee_Id} = req.body;
    try{
        const poll = await Polls.findOne({ _id: poll_Id });
        const optionArray = poll.options.id(option_Id);
        optionArray.employeeId.push(employee_Id);
        const flag = poll.employeeId.includes(employee_Id);
        if(flag)
        {
          const polls = await Polls.find();
          responseMessages.polls = polls;
          responseMessages.messages.message = "You have already voted for this poll";
          responseMessages.messages.status = VOTE_DUPLICATE;
          return res.status(200).json(responseMessages);
        }
        else
        {
          poll.employeeId.push(employee_Id);
          optionArray.votes+=1;
          await poll.save();
          const polls = await Polls.find();
          responseMessages.polls = polls;       
          responseMessages.messages.message = "Vote count updated for the poll";
          responseMessages.messages.status = VOTE_SUCCESS;
          return res.status(200).json(responseMessages);     
        }     
    }          
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default router;