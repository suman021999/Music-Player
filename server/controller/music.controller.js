
import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import { Music } from '../models/music.model.js';
import { parseBuffer } from 'music-metadata';
import sharp from 'sharp'; // for image conversion

export const uploadMusic = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const file = req.file;

    if (!file.mimetype.startsWith('audio/')) {
      return res.status(400).json({
        success: false,
        message: `Invalid file type (${file.mimetype}). Only audio files are allowed.`,
      });
    }

    // Extract metadata including image
    const metadata = await parseBuffer(file.buffer, file.mimetype);
    let coverUrl = '';

    // Upload audio file to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: 'music_uploads',
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });

      uploadStream.end(file.buffer);
    });

    // Upload embedded cover art if available and convert to PNG
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const cover = metadata.common.picture[0];

      // Convert raw image buffer to PNG using sharp
      const convertedBuffer = await sharp(cover.data)
        .toFormat('png')
        .toBuffer();

      const uploadedCover = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
          folder: 'music_covers',
          resource_type: 'image',
          format: 'png',
          use_filename: true,
          unique_filename: true,
        }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });

        uploadStream.end(convertedBuffer);
      });

      coverUrl = uploadedCover.secure_url;
    }

    // Save to DB
    const music = await Music.create({
      audioUrl: result.secure_url,
      imageData: coverUrl || undefined, // fallback if no image
      text: req.body.text || '',
      originalname: file.originalname,
      public_id: result.public_id,
      format: result.format,
      duration: result.duration,
      bytes: result.bytes,
      mimetype: file.mimetype
    });

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





export const deleteMusic = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Music ID is required'
    });
  }

  try {
    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({
        success: false,
        message: 'Music not found'
      });
    }

    // Only try to delete from Cloudinary if public_id exists
    if (music.public_id) {
      try {
        await cloudinary.uploader.destroy(music.public_id, { resource_type: 'auto' });
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
        // You might want to continue with DB deletion even if Cloudinary fails
      }
    }

    await Music.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Music deleted successfully'
    });
  } catch (error) {
    console.error('Delete Music Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete music',
      error: error.message
    });
  }
});


