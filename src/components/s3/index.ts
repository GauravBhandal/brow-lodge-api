import fs from "fs";
import S3 from "aws-sdk/clients/s3";

import config from "../../config/environment";

const bucketName = "";
const region = "";
const accessKeyId = "";
const secretAccessKey = "";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file: Express.Multer.File, company: string) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName + "/" + company,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3
function getFileStream(fileKey: any) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

export { uploadFile, getFileStream };
