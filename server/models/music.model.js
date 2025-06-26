import mongoose, { Schema } from "mongoose";

const musicSchema = new Schema(
  {
    audioUrl: {
      type: String,
      required: true,
    },
    imageData: {
      type: String,
      default:"https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
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