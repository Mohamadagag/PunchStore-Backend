const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  limits: { fieldSize: 16 * 1024 * 1024 },
  storage: storage,
  fileFilter: (req, file, cb) => {
    let fileTypes = /jpeg|jpg|png/;
    let mimeType = fileTypes.test(file.mimetype);
    let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extname) return cb(null, true);
    cb(new Error("file extension should be a .jpeg, .jpg, .png"));
  },
});

module.exports = upload;
