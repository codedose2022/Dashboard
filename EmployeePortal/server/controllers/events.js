import express from "express";
import mongoose from "mongoose";
import commentsSchema from "../models/commentsSchema.js";
import Dislike from "../models/dislikeSchema.js";
import Events from "../models/eventsSchema.js";
import Like from "../models/likeSchema.js";
import fs from "fs";

const router = express.Router();

export const getEvents = async (req, res) => {
  try {
    let events = [];
    const division = req.header("division");
    if (division === "EE" || division === "SA") {
      events = await Events.find({
        $or: [
          {
            $and: [
              { status: { $in: ["Disapproved", "pending"] } },
              { date: { $gte: new Date() } },
            ],
          },
          { status: "Approved" },
        ],
      }).sort({ updatedAt: -1 });
    } else {
      events = await Events.find({ status: "Approved" }).sort({
        updatedAt: -1,
      });
    }
    let mappedArr = events.map(async (event) => {
      //Adding likes, dislikes and comments array to the respective events.
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
        await commentsSchema
          .find({
            eventId: event._id,
          })
          .sort({ createdAt: -1 })
          .then((comment) => {
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
  const title = req.body.title;
  const date = req.body.date;
  const venue = req.body.venue;
  const desc = req.body.desc;
  const img = req.file ? req.file.filename : "";
  const time = req.body.time;
  const status = req.body.status;

  const eventData = {
    title,
    date,
    venue,
    desc,
    img,
    time,
    status,
  };
  const event = new Events(eventData);
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
  const title = req.body.title;
  const date = req.body.date;
  const venue = req.body.venue;
  const desc = req.body.desc;
  const img = req.file ? req.file.filename : req.body.img;
  const time = req.body.time;
  const status = req.body.status;
  const _id = req.body._id;

  const eventData = {
    title,
    date,
    venue,
    desc,
    img,
    time,
    status,
    _id,
  };

  let responseData = {
    events: {},
    messages: {
      status: "",
      message: "",
    },
  };

  const entries = Object.keys(eventData);

  if (!mongoose.Types.ObjectId.isValid(eventData._id)) {
    responseData.messages.message = "Update failed due to invalid post id";
    responseData.messages.status = "20";
    return res.status(404).send({
      responseData,
    });
  }

  try {
    const updates = {};
    await Events.findOne({
      _id: eventData._id,
    }).then((event) => {
      if (event.img !== img) {
        try {
          fs.unlinkSync("images/" + event.img);
        } catch (err) {
          if (err.code === "ENOENT") {
            console.log("File not found!");
          } else {
            throw err;
          }
        }
      }
    });
    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(eventData)[i];
    }
    await Events.updateOne(
      {
        _id: eventData._id,
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

export const approval = async (req, res) => {
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
    try {
      if (req.body.img !== "") {
        fs.unlinkSync("images/" + req.body.img);
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("File not found!");
      } else {
        throw err;
      }
    }

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
