import mongoose from 'mongoose';
import Users from '../../../modules/schema/UserSchema';
import connectMongo from '../../../database/mdb';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (mongoose.connection.readyState == 0) {
    connectMongo().catch((error) => {
      console.log(error);
      error: 'Connection Failed...!';
    });
  }
  if (req.method === 'GET') {
    const session = await getSession({ req });
    if (!session || !session?.user?.id) {
      return res.status(401).json({ message: 'Signin required' });
    }
    let result = await Users.findById(new ObjectId(session.user.id), {
      image: 1,
    });
    // console.log(result);
    res.status(200).json(result);
  } else {
    res
      .status(500)
      .json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
