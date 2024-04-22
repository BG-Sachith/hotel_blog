import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const postSchema = new Schema(
  {
    title: String,
    summary: String, //due to small card
    isPublish: Boolean,
    image: String,
    category: ObjectId,
    tag: Array,
    createdAt: Date,
    modifiedAt: Date,
    createdBy: String,
    modfiedBy: String,
    likes: Array,
    publishAt: Date,
    publicUrl: String,
  }
  // { strict: false }
);

const Posts = models.Post || model('Post', postSchema);

export default Posts;
