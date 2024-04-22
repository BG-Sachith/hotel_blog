const likesSchema = new Schema({
  postId: ObjectId,
  createdAt: Date,
  modfiedAt: Date,
  createdBy: String,
  modfiedBy: String,
});

const Likes = models.Likes || model('Likes', likesSchema);

export default Likes;
