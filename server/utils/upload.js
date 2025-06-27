import multer from "multer";
// import { v4 as uuidv4 } from 'uuid';

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
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






