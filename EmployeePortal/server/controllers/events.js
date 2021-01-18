import express from "express";
import Events from '../models/eventsSchema.js';
import mongoose from 'mongoose';
const router = express.Router();


export const getEvents = async (req,res) => { 
  try {
    let events = [];
    const division = req.header("division");
    if(division === 'EE'){
      events = await Events.find();

    }
    else{
     events = await Events.find({"status":"Approved"});

    }

     res.status(200).json(events);
 } catch (error) {
     res.status(404).json({ message: error.message });
 }
}


export const createEvents = async (req,res) => { 
  const event = new Events(req.body);

//let currentDate = event.postedDate.getFullYear() + '-' + (event.postedDate.getMonth() + 1) + '-' + event.postedDate.getDate();
const todayDate = new Date()
let responseData = {   
  events : {
  },
  messages:{
    status:'',
    message:''
}   
}
  try {
    
    
        await event.save();  
        responseData.messages.message = 'Event Added.';
        responseData.messages.status = '21';
        const events = await Events.find();
        responseData.events = events;
        res.status(200).send({
          responseData
          });
      
    
 } catch (error) {
     res.status(404).json({ message: error.message });

 }
}

export const editEvents = async (req,res) => { 
  let responseData = {   
      events : {
      },
      messages:{
        status:'',
        message:''
    }   
  }
  try {


      const todayDate = new Date();
      const event = new Events(req.body);
      const entries = Object.keys(req.body);

      if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
        responseData.messages.message = 'Update failed due to invalid post id';
        responseData.messages.status = '20';
        return res.status(404).send({
          responseData
          });    
      }
      if(event.date.getFullYear() >= todayDate.getFullYear() && 
      event.date.getMonth() >= todayDate.getMonth()){ 
        
        const updates = {}
        for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i]
        }
        await Events.updateOne({
        "_id": req.body._id
        } , {
        $set: updates
        } )
        //function (err , success) {
        // if (err) throw (err);
        // else {
          responseData.messages.message = 'Updated Successfully';
          responseData.messages.status = '21';

        if(responseData.messages.status = '21'){
          const events = await Events.find();
          responseData.events = events;
          return res.status(200).send({
            responseData
            });
        }
        
        // }
       // })
        
          
      }
      else{
        responseData.messages.message = 'Please select the future date';
        responseData.messages.status = '22';
        res.status(422).send({
          responseData
          });
      }
       

 } catch (error) {
     res.status(404).json({ message: error.message });
 }
}

export const deleteEvents = async (req,res) => { 
  let responseData = {   
    events : {
    },
    messages:{
      status:'',
      message:''
  }   
}
try {
  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    responseData.messages.message = 'No event with this id to be deleted';
    responseData.messages.status = '20';
    return res.status(404).send({
      responseData
      });
  }
 
  await Events.findByIdAndRemove(req.body._id);
  responseData.messages.message = 'Event deleted successfully.';
  responseData.messages.status = '21';
  const events = await Events.find();
  responseData.events = events;
  return res.status(200).send({
    responseData
    });
} catch (error) {
  res.status(404).json({ message: error.message });
}
}
export default router;