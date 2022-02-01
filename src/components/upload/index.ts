import multer from "multer";
import util from "util";
import fs from "fs";
import path from "path";
import { Request } from "express";

import { CustomError } from "../errors";

const MAX_DOCUMENT_SIZE = 6000001; // 6 Mb

// Configure multer by setting file name and location
const storage = multer.diskStorage({
  destination: "temp/uploads",
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const { originalname } = file;
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitisedFileName =
      uniquePrefix +
      "-" +
      originalname.trim().toLowerCase().split(" ").join("_");
    callback(null, sanitisedFileName);
  },
});

// Helper function to validate the file type
const isValidFileFormat = (mimetype: string, fileExtension: string) => {
  const validMimetypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/msword",
    "text/csv",
  ];
  const validFileExtensions = [
    ".pdf",
    ".png",
    ".jpeg",
    ".jpg",
    ".docx",
    ".xlsx",
    ".xls",
    ".csv",
    ".doc",
  ];
  const isValid =
    validMimetypes.includes(mimetype) &&
    validFileExtensions.includes(fileExtension);
  return isValid;
};

// Check the file type and throw error if type is not supported
const fileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
  var fileMimetype = file.mimetype;
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (isValidFileFormat(fileMimetype, fileExtension)) {
    return callback(null, true);
  }
  callback(new CustomError(400, "DOCUMENT_TYPE_NOT_ALLOWED"));
};

// Multer upload middleware
const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_DOCUMENT_SIZE, // 6 Mb
  },
});

export default uploadMiddleware.single("file");

// Util to remove a file from local server
export const removeFileFromLocal = util.promisify(fs.unlink);
