import { Schema, model } from 'mongoose';
import { AdminMethods, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin, AdminMethods>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
  },
);

// adminSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

//checking if user is already exist!
adminSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await AdminModel.findOne({ email });
  return existingUser;
};

export const AdminModel = model<TAdmin, AdminMethods>('Admin', adminSchema);
