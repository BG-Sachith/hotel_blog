// app/api/documents.ts
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// app/api/documents/[key].ts
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const Bucket = process.env.AMPLIFY_BUCKET; // Your S3 bucket name

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
// s3 with nextjs in rout file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('image') as File[];
    const path_ = formData.get('path_') as string;
    const name_ = formData.get('name_') as string;

    console.log(files);
    const res = await Promise.all(
      files.map(async (file) => {
        const Body: any = await file.arrayBuffer();
        return await s3.send(
          new PutObjectCommand({
            BucketKeyEnabled: true,
            Bucket,
            Key: path_ + name_,
            ACL: 'public-read',
            Body,
          })
        );
      })
    );
    console.log(res);
    return NextResponse.json({
      success: true,
      fileRes: {
        Key: path_ + name_,
        Location: `https://vajrapani-blog-dev3.s3.eu-north-1.amazonaws.com/${
          path_ + name_
        }`,
      },
    });
  } catch (error) {
    console.log('path_ + name_');
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(_: Request, { params }: { params: { key: string } }) {
  const command = new GetObjectCommand({
    Bucket,
    Key: params.key,
  });

  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}
