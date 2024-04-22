'use strict';
import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';
import { S3_TEMP_PATH } from '@/util/const';

const bucketName = process.env.S3_BUCKET_NAME;
const region = 'eu-north-1';
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const tempPath = S3_TEMP_PATH;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
export const uploadFile = (name_: string, path_: any) => {
  //   const fileStream = file.image; //fs.createReadStream(file.image);
  const dir = path.resolve(tempPath, ''); //todo set dot for locale
  const uploadParams: any = {
    Bucket: bucketName,
    Body: fs.createReadStream(path.join(dir, name_)),
    // Body: fs.createReadStream(path.join(process.cwd(), name_)),
    Key: path_ + name_,
    ACL: 'public-read',
  };

  return s3.upload(uploadParams).promise();
};
// exports.uploadFile = uploadFile;

// downloads a file from s3
export const getFileStream = async (fileKey: string) => {
  const downloadParams: any = {
    Key: fileKey,
    Bucket: bucketName,
  };
  if (!fileKey) throw Error('Invalid Key');
  // return await s3.getObject(downloadParams).createReadStream();

  return await new Promise((resolve, reject) => {
    if (false) {
      resolve('');
    }
    // todo remove
    else
      s3.getObject(downloadParams, (err, data: any) => {
        if (err) reject(err);
        let imgData = 'data:image/jpeg;base64,' + data?.Body.toString('base64');
        resolve(imgData);
      });
  });
};
