import multer from "multer";

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(`Invalid file type (${file.mimetype}). Only audio files are allowed.`),
      false
    );
  }
}

export const upload = multer({
  storage,
  fileFilter,
});