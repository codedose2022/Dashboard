import express from "express";
import galleries from "../models/gallerySchema.js";
import { readdir } from "fs/promises";
const router = express.Router();

export const getAlbums = async (req, res) => {
  let responseData = {
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    const albums = await galleries.find();
    var albumsList = albums.map(async (album) => {
      let imagesList = [];
      try {
        const filenames = await readdir(`images/${album.albumFolder}`);
        for await (const filename of filenames) {
          imagesList.push(filename);
        }
        album._doc.imageLists = imagesList;
      } catch (err) {
        console.error(err);
      }
      return album;
    });
    const results = await Promise.all(albumsList);
    responseData.gallery = results;
    responseData.status = "22";
    res.status(200).json(responseData);
  } catch (error) {
    console.log("catch block" + error);
  }
};

export const checkAlbum = async (req, res, next) => {
  console.log(req.body);
  const { albumTitle } = req.body;
  let album_folder = "";
  try {
    const albumAlreadyExist = await galleries.findOne({ albumTitle });
    console.log(albumAlreadyExist);
    if (albumAlreadyExist) {
      console.log("Already Exist");
    } else {
      console.log("here");
      album_folder = albumTitle.replace(/\s/g, "");
      console.log("et" + album_folder);
      req.body.albumFolder = album_folder;
      console.log(req.body);
    }

    console.log("Success");
    next();
  } catch (error) {
    console.log("catch block" + error);
  }
};

export const createAlbums = async (req, res) => {
  try {
    const album = new galleries(req.body);
    await album.save();
  } catch (error) {
    console.log("catch block" + error);
  }
};

export default router;
