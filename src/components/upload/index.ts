import multer from "multer";
import util from "util";
import fs from "fs";

export const removeFileFromLocal = util.promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    // or
    // uuid, or fieldname
    cb(null, originalname);
  },
});

const upload = multer({ storage });

export default upload.single("attachment");
