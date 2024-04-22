import { NextApiHandler } from 'next';
// import busboy from 'busboy';
import { getFileStream } from './s3';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  try {
    const { name_ } = req.query;
    // console.log(image);
    let fileRes = await getFileStream('post/' + name_);
    // console.log(fileRes);
    res.status(200).json({ fileRes });
  } catch (error) {
    res.status(500).json(error);
    // await fs.mkdir(path.join('/public', '/images'));
  }
}

export { handler as POST };
