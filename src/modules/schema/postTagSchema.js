import { Schema, model, models } from 'mongoose';

const postTagSchema = new Schema({
  name: String,
  active: Boolean,
});

const PostTags = models.PostTag || model('PostTag', postTagSchema);

export default PostTags;
// {
//   "name": "Fruits",
//   "active": true
// }
