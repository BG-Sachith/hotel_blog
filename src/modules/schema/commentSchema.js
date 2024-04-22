import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema(
  {
    message: String,
    postId: ObjectId,
    createdAt: Date,
    modfiedAt: Date,
    createdBy: String,
    modfiedBy: String,
    hide: Boolean,
  }
  // { strict: false }
);

const Comments = models.Comments || model('Comments', commentSchema);

export default Comments;
