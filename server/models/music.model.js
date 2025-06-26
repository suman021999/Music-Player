import mongoose, { Schema } from "mongoose";

const musicSchema = new Schema(
  {
    audioUrl: {
      type: String,
      required: true,
    },
    imageData: {
      type: String, 
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    originalname: {
      type: String,
      required: false,
    },
    public_id: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    bytes: {
      type: Number,
      required: false,
    },
    mimetype: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

export const Music = mongoose.model("Music", musicSchema);