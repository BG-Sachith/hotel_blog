import { Schema, model, models } from 'mongoose';

const clientMsgSchema = new Schema(
  {
    message: String,
    name: String,
    createdAt: Date,
    createdBy: String,
    isRead: Boolean,
    isReplied: Boolean,
    res: String,
  }
  // { strict: false }
);

const ClientMsgs = models.ClientMsgs || model('ClientMsgs', clientMsgSchema);

export default ClientMsgs;
