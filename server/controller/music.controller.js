import asynchandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';

export const uploadMusic = asynchandler(async (req, res) => {
  try {
    // Check if file exists (already filtered by multer, but double-checking)
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    const file = req.file;
    
    // Additional validation (though multer already filtered)
    if (!file.mimetype.startsWith('audio/')) {
      return res.status(400).json({ 
        success: false,
        message: `Invalid file type (${file.mimetype}). Only audio files are allowed.`,
        allowedTypes: supportedAudioTypes
      });
    }

    // Upload to Cloudinary - using file.buffer since we're using memoryStorage
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

      // Write the buffer to the upload stream
      uploadStream.end(file.buffer);
    });

    // Successful upload response
    res.status(200).json({ 
      success: true,
      message: 'Music file uploaded successfully',
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format,
        duration: result.duration,
        bytes: result.bytes,
        mimetype: file.mimetype,
        originalname: file.originalname
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

