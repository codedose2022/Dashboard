import express from "express";
import galleries from "../models/gallerySchema.js";
import { readdir, rmdir } from "fs/promises";
import fs from "fs";
import mongoose from "mongoose";

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
    responseData.messages.status = "22";
    res.status(200).json(responseData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkAlbum = async (req, res, next) => {
  const albumTitle = req.header("albumTitle");
  let responseData = {
    messages: {
      status: "",
      message: "",
    },
  };

  let album_folder = "";
  try {
    album_folder = albumTitle.replace(/\s/g, "");
    const albumAlreadyExist = await galleries.findOne({
      albumFolder: album_folder,
    });
    if (albumAlreadyExist) {
      responseData.messages.status = "21";
      responseData.messages.message = "Already Exist";
      res.status(200).json(responseData);
    } else {
      req.body.albumFolder = album_folder;
      if (!fs.existsSync(`images/Gallery/${album_folder}`)) {
        fs.mkdirSync(`images/Gallery/${album_folder}`);
      }
      next();
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAlbums = async (req, res) => {
  let responseData = {
    messages: {
      status: "21",
      message: "Album added successfully",
    },
  };
  try {
    const albumName = req.header("albumTitle");
    const album = {
      albumTitle: albumName,
      albumFolder: req.body.albumFolder,
      thumbnail : req.files[0].filename
    };
    const albums = new galleries(album);
    await albums.save();
    const albumsLists = await galleries.find();
    responseData.gallery = albumsLists;

    res.status(200).json(responseData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  let responseData = {
    albumLists: {},
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      responseData.messages.message = "No album with this id to be deleted";
      responseData.messages.status = "20";
      return res.status(404).send({
        responseData,
      });
    }
    await galleries
      .findOne({
        _id: req.body._id,
      })
      .then((album) => {
        try {
          rmdir(`images/Gallery/${album.albumFolder}`, {
            recursive: true,
          }).then(async () => {
            responseData.messages.message = "Album deleted successfully.";
            responseData.messages.status = "21";
            await galleries.findByIdAndRemove(req.body._id);
            const albumLists = await galleries.find();
            responseData.gallery = albumLists;
            return res.status(200).send({
              responseData,
            });
          });
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  let responseData = {
    albumLists: {},
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      responseData.messages.message = "No album with this id to be deleted";
      responseData.messages.status = "20";
      return res.status(404).send({
        responseData,
      });
    }
    try {
      const album = await galleries.findOne({ _id: req.body._id });
      fs.unlinkSync(`images/Gallery/${album.albumFolder}/` + req.body.image);
      responseData.messages.message = "image deleted successfully.";
      responseData.messages.status = "21";
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
    const albumLists = await galleries.find();
    responseData.gallery = albumLists;
    return res.status(200).send({
      responseData,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getAlbumFolder = async (req, res, next) => {
  const albumId = req.header("id");
  const albumFolder = req.header("albumFolder");
  let responseData = {
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    const album = await galleries.findOne({ _id: albumId }); 
    if (album &&   albumFolder === album.albumFolder) {
      if (fs.existsSync(`images/Gallery/${albumFolder}`)) {
        next();
      }
    } else {
      responseData.messages.message = "No Album with this name exists.";
      responseData.messages.status = "20"; 
      return res.status(404).send({
        responseData,
      });
      }
     
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addMoreImages = async (req, res) => {
  let responseData = {
    albumLists: {},
    messages: {
      status: "",
      message: "",
    },
  };
  try {
    responseData.messages.message = 'images added to the Album.';
    responseData.messages.status = '21'
    const albumLists = await galleries.find();
    responseData.gallery = albumLists;
    return res.status(200).send({
      responseData,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export default router;
