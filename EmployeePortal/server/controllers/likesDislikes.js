import express from "express";
import Like from "../models/likeSchema.js";
import Dislike from "../models/dislikeSchema.js";
import Events from '../models/eventsSchema.js';
import mongoose from "mongoose";
const router = express.Router();

export const getLikes = async (req, res) => {
  try {
    const likes = await Like.find(req.body);
    res.status(200).json({ success: true, likes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDislikes = async (req, res) => {
  try {
    const dislike = await Dislike.find(req.body);
    res.status(200).json({ success: true, dislike });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const upLike = async (req, res) => {
  let responseData = {
    message: [],
  };

  try {
    const likeDetail = {
      eventId: req.body.eventId,
      employeeId: req.body.employeeId,
    };
   
    const like = new Like(likeDetail);
    like.save((err, likeResult) => {
      if (err) {
        responseData.message.push ({status : '20', message : 'could not like and save to like db' })
      }
      else{
        responseData.message.push ({status : '21', message : 'liked and saved to like db' })
      }

      //In case disLike Button is already clicked, we need to decrease the dislike by 1
      Dislike.findOneAndDelete(likeDetail).exec((err, disLikeResult) => {
        if (err) {
          responseData.message.push ({status : '22', message : 'nothing to dislike' })
        
       // return res.status(400).send({ responseData });
        }
        else{
          responseData.message.push ({status : '23', message : 'disliked' })
        }
         res.status(200).send(responseData);
      });


    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const unLike = async (req, res) => {
  let responseData = {
    message: [],
  };
  try {
    const likeDetail = {
      eventId: req.body.eventId,
      employeeId: req.body.employeeId,
    };
    Like.findOneAndDelete(likeDetail).exec((err, result) => {
      if (err){
        responseData.message.push ({status : '22', message : 'could not unlike' })
      }
     else{
      responseData.message.push ({status : '23', message : 'Unliked' })
     }
      res.status(200).send(responseData);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const upDisLike = async (req, res) => {
  let responseData = {
    message: [],
  };

  try {
    const dislikeDetail = {
      eventId: req.body.eventId,
      employeeId: req.body.employeeId,
    };
   
    const dislike = new Dislike(dislikeDetail);
    dislike.save((err, dislikeResult) => {
      if (err) {
        responseData.message.push ({status : '20', message : 'could not like and save to like db' })
      }
      else{
        responseData.message.push ({status : '21', message : 'liked and saved to like db' })
      }

      //In case disLike Button is already clicked, we need to decrease the dislike by 1
      Like.findOneAndDelete(dislikeDetail).exec((err, likeResult) => {
        if (err) {
          responseData.message.push ({status : '22', message : 'nothing to dislike' })
        
       // return res.status(400).send({ responseData });
        }
        else{
          responseData.message.push ({status : '23', message : 'disliked' })
        }
        res.status(200).send(responseData);
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const unDisLike = async (req, res) => {
  let responseData = {
    message: [],
  };
  try {
    const dislikeDetail = {
      eventId: req.body.eventId,
      employeeId: req.body.employeeId,
    };
    Dislike.findOneAndDelete(dislikeDetail).exec((err, result) => {
      if (err){
        responseData.message.push ({status : '22', message : 'could not undislike' })
      }
     else{
      responseData.message.push ({status : '23', message : 'disliked' })
     }
      res.status(200).send(responseData);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;