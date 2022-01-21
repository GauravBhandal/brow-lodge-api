import fs from "fs";
import S3 from "aws-sdk/clients/s3";

import config from "../../config/environment";

const bucketName = config.AWS_S3_BUCKET_NAME;
const region = config.AWS_S3_BUCKET_REGION;
const accessKeyId = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file: any) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
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
