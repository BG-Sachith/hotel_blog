import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
  },
  password: { type: String, required: [true, 'Please provide a password'] },
  image: String,
  bio: String,
  createdAt: Date,
  modfiedAt: Date,
  role: ObjectId,
  isNotificationOn: Boolean,
});

const Users = models.User || model('User', userSchema);

export default Users;
