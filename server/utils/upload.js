import multer from "multer";

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const allowedMimeTypes = [
    "audio/mpeg", // MP3
    "audio/wav",  // WAV
    "audio/ogg",  // OGG
    "audio/aac",  // AAC
    "audio/webm", // WEBM
    "audio/x-m4a", // M4A
    "audio/x-aiff" // AIFF
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only audio files are allowed."), false);
  }
}

export const upload = multer({ 
  storage,fileFilter
});