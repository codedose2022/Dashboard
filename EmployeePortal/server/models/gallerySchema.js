import mongoose from "mongoose";


const gallerySchema = mongoose.Schema(
  {
    albumTitle: {
      type: String,
    },
    albumFolder: {
        type: String,
    },
    thumbnail : {
      type : String
    }
  },
  { timestamps: true }
);

const galleries = mongoose.model("galleries", gallerySchema);

export default galleries;
