import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const Bucket = process.env.AMPLIFY_BUCKET;
export const populateS3SignedUrl = (key: any) => {
  const command = new GetObjectCommand({
    Bucket,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
};
