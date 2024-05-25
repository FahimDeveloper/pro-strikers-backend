import { Schema, model } from 'mongoose';
import { AdminMethods, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin, AdminMethods>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['superAdmin', 'admin', 'trainer'],
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isAdminExists = async function (email: string) {
  const existingUser = await Admin.findOne({ email });
  return existingUser;
};

export const Admin = model<IAdmin, AdminMethods>('Admin', adminSchema);
