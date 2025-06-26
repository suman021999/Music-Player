
import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import { Music } from '../models/music.model.js';


export const uploadMusic = asyncHandler(async (req, res) => {
  try {
   
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    const file = req.file;
    
    // Validate file type
    if (!file.mimetype.startsWith('audio/')) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid file type (${file.mimetype}). Only audio files are allowed.`,
      });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'music_uploads',
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    // Create music document in database
    const music = await Music.create({
      audioUrl: result.secure_url,
      imageData: req.body.img || '', 
      text: req.body.text || '',
      originalname: file.originalname,
      public_id: result.public_id,
      format: result.format,
      duration: result.duration,
      bytes: result.bytes,
      mimetype: file.mimetype
    });

    // Successful response
    res.status(200).json({ 
      success: true,
      message: 'Music file uploaded successfully',
      data: {
        public_id: music.public_id,
        url: music.audioUrl,
        img: music.imageData,
        text: music.text || music.originalname,
        format: music.format,
        duration: music.duration,
        bytes: music.bytes,
        mimetype: music.mimetype
      }
    });

  } catch (error) {
    console.error('Music Upload Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to upload music file',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
});

// Get all music
export const getAllMusic = asyncHandler(async (req, res) => {
  try {
    const musicList = await Music.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: musicList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch music',
      error: error.message
    });
  }
});



