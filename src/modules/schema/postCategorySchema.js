import { Schema, model, models } from 'mongoose';

const postCategorySchema = new Schema({
  name: String,
  active: Boolean,
});

const PostCategories =
  models.PostCategory || model('PostCategory', postCategorySchema);

export default PostCategories;
// {
//   "name": "Fruits",
//   "active": true
// }
