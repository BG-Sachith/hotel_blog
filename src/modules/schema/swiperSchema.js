import { File } from 'buffer';
import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const swiperSchema = new Schema(
  {
    url: String,
    active: Boolean,
    order: String,
    modfiedAt: Date,
    createdBy: String,
    modfiedBy: String,
  },
  { strict: false }
);

const Swiper = models.Swiper || model('Swiper', swiperSchema);

export default Swiper;
