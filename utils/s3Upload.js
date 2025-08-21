// utils/s3Upload.js
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as awsGetSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload a file to S3 and return the S3 object key (not full URL)
 * @param {string} filePath - Local path of the file
 * @param {string} folder - Folder in the bucket (default: "mess_photos")
 * @returns {string} - S3 object key
 */
export const uploadFileToS3 = async (filePath, folder = "mess_photos") => {
  try {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    const fileKey = `${folder}/${Date.now()}_${fileName}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: fileStream,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    return fileKey; // return only the key
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
};

/**
 * Generate a signed URL for an S3 object key
 * @param {string} key - S3 object key
 * @param {number} expiresIn - URL expiration in seconds (default: 3600)
 * @returns {string} - Signed URL
 */
export const getSignedS3Url = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    const url = await awsGetSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (err) {
    console.error("Error generating signed URL:", err);
    throw err;
  }
};
