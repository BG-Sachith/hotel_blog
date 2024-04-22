import { Schema, model, models } from 'mongoose';

const resetPwdSchema = new Schema(
  {
    otp: Number,
    email: String,
  },
  { strict: false }
);

const ResetPwds = models.ResetPwd || model('ResetPwd', resetPwdSchema);

export default ResetPwds;
