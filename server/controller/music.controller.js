import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import { Music } from "../models/music.model.js";
import { parseBuffer } from "music-metadata";
import sharp from "sharp";
import * as mm from "music-metadata";



export const uploadMusic = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.file;

    // Early validation
    if (!file.mimetype.startsWith("audio/")) {
      return res.status(400).json({
        success: false,
        message: `Invalid file type (${file.mimetype}). Only audio files are allowed.`,
      });
    }

    let artist = null;
    try {
      const metadata = await mm.parseBuffer(file.buffer, file.mimetype);
      artist = metadata.common.artist || null; // Extract only artist name
    } catch (metadataError) {
      console.error("Metadata extraction error:", metadataError); // Fail silently
    }

    // Parallelize metadata extraction and Cloudinary upload
    const [metadata, audioUpload] = await Promise.all([
      parseBuffer(file.buffer, file.mimetype),
      uploadToCloudinary(file.buffer, "music_uploads", "auto"),
    ]);

    // Handle cover art upload if available (without blocking)
    let coverUrl = "";
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const cover = metadata.common.picture[0];
      try {
        const convertedBuffer = await sharp(cover.data)
          .toFormat("png")
          .toBuffer();

        const uploadedCover = await uploadToCloudinary(
          convertedBuffer,
          "music_covers",
          "image",
          { format: "png" }
        );
        coverUrl = uploadedCover.secure_url;
      } catch (coverError) {
        console.error("Cover art processing error:", coverError);
        // Continue without cover art if there's an error
      }
    }

    // Save to DB
    const music = await Music.create({
      audioUrl: audioUpload.secure_url,
      imageData: coverUrl || undefined,
      artist: artist || undefined,
      text: req.body.text || "",
      originalname: file.originalname,
      public_id: audioUpload.public_id,
      format: audioUpload.format,
      duration: audioUpload.duration,
      bytes: audioUpload.bytes,
      mimetype: file.mimetype,
    });

    // Streamlined response
    res.status(200).json({
      success: true,
      message: "Music file uploaded successfully",
      data: formatMusicResponse(music),
    });
  } catch (error) {
    console.error("Music Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload music file",
      error:
        process.env.NODE_ENV === "development"
          ? {
              message: error.message,
              stack: error.stack,
            }
          : undefined,
    });
  }
});

// Helper function for Cloudinary uploads
function uploadToCloudinary(
  buffer,
  folder,
  resourceType,
  additionalOptions = {}
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        ...additionalOptions,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

// Helper function to format response
function formatMusicResponse(music) {
  return {
    public_id: music.public_id,
    url: music.audioUrl,
    img: music.imageData,
    artist: music.artist,
    text: music.text || music.originalname,
    format: music.format,
    duration: music.duration,
    bytes: music.bytes,
    mimetype: music.mimetype,
  };
}




// Get all music
export const getAllMusic = asyncHandler(async (req, res) => {
  try {
    const musicList = await Music.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: musicList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch music",
      error: error.message,
    });
  }
});

export const deleteMusic = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Music ID is required",
    });
  }

  try {
    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({
        success: false,
        message: "Music not found",
      });
    }

    // Only try to delete from Cloudinary if public_id exists
    if (music.public_id) {
      try {
        await cloudinary.uploader.destroy(music.public_id, {
          resource_type: "auto",
        });
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // You might want to continue with DB deletion even if Cloudinary fails
      }
    }

    await Music.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Music deleted successfully",
    });
  } catch (error) {
    console.error("Delete Music Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete music",
      error: error.message,
    });
  }
});

