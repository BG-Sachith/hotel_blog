import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const postContentsSchema = new Schema({
  language: String,
  content: String,
  postId: ObjectId,
});

const PostContents =
  models.PostContents || model('PostContents', postContentsSchema);

export default PostContents;
