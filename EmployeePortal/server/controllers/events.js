import express from "express";
import Events from "../models/eventsSchema.js";
import Dislike from "../models/dislikeSchema.js";
import Like from "../models/likeSchema.js";
import commentsSchema from "../models/commentsSchema.js";
import mongoose from "mongoose";
import _ from "lodash";
const router = express.Router();

export const getEvents = async (req, res) => {
  try {
    let events = [];
    const division = req.header("division");
    if (division === "EE" || division === "SA") {
      events = await Events.find().sort({"updatedAt": -1});
    } else {
      events = await Events.find({ status: "Approved" }).sort({"updatedAt": -1});
    }
    let mappedArr = events.map(async (event) => {
      try {
        await Like.find({
          eventId: event._id,
        }).then((like) => {
          event._doc.likes = like;
        });

        await Dislike.find({
          eventId: event._id,
        }).then((dislike) => {
          event._doc.dislikes = dislike;
        });
        await commentsSchema.find({
          eventId: event._id,
        }).sort({"createdAt": -1}).then((comment) => {
          event._doc.comments = comment;
        });
        return event;
      } catch (error) {
        console.log(error.message);
      }
    });

    const results = await Promise.all(mappedArr);
    return res.status(200).send(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvents = async (req, res) => {
  const event = new Events(req.body);

  let responseData = {
    events: {},
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    await event.save();
    responseData.messages.message = "Event Added.";
    responseData.messages.status = "21";
    const events = await Events.find();
    responseData.events = events;
    res.status(200).send({
      responseData,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editEvents = async (req, res) => {
  let responseData = {
    events: {},
    messages: {
      status: "",
      message: "",
    },
  };
  const entries = Object.keys(req.body);

  if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
    responseData.messages.message = "Update failed due to invalid post id";
    responseData.messages.status = "20";
    return res.status(404).send({
      responseData,
    });
  }

  try {
    const updates = {};
    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(req.body)[i];
    }
    await Events.updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: updates,
      }
    );

    responseData.messages.message = "Updated Successfully";
    responseData.messages.status = "21";

    if ((responseData.messages.status = "21")) {
      const events = await Events.find();
      responseData.events = events;
      return res.status(200).send({
        responseData,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteEvents = async (req, res) => {
  let responseData = {
    events: {},
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      responseData.messages.message = "No event with this id to be deleted";
      responseData.messages.status = "20";
      return res.status(404).send({
        responseData,
      });
    }

    await Events.findByIdAndRemove(req.body._id);
    responseData.messages.message = "Event deleted successfully.";
    responseData.messages.status = "21";
    const events = await Events.find();
    responseData.events = events;
    return res.status(200).send({
      responseData,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export default router;
