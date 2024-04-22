import { Schema, model, models } from 'mongoose';

const roleSchema = new Schema({
  name: String,
});

const Role = models.Role || model('Role', roleSchema);

export default Role;
