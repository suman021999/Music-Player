import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    audio: {
      type: String,
      required: false,
      default: ""
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);