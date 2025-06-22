import asynchandler from 'express-async-handler';

export  const upload=asynchandler(async (req, res) => {

  res.status(200).json({ message: "File uploaded successfully.", file: req.file });
})