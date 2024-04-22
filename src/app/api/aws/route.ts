import { NextApiHandler, NextApiRequest } from 'next';
// import busboy from 'busboy';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import { getFileStream, uploadFile } from './s3';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST: NextApiHandler = async (req: any, res) => {
  try {
    const { name_, path_ } = req.query;
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), '/public/images/temp');
    options.filename = (name, path: any, form) => {
      return name_;
    };

    const form = formidable(options);
    let fileRes: any = {};
    await new Promise((resolve, reject) => {
      form.parse(req, async (err, flilds, files) => {
        if (err) reject(err);
        fileRes = await uploadFile(name_, path_);
        // console.log(fileRes);
        fileRes = await getFileStream(fileRes.Key);
        console.log(fileRes);
        // console.log('filefffffffffffffffffffffffffffffffffffffffff');
        resolve({ flilds, files });
      });
    }).then(() => {
      fs.unlinkSync(path.join(process.cwd(), '/public/images/temp/') + name_);
      res.status(200).json({ fileRes });
    });
  } catch (error) {
    res.status(500).json(error);
    // await fs.mkdir(path.join('/public', '/images'));
  }
};
