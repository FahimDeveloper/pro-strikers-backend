import { Schema, model } from 'mongoose';
import { AdminMethods, IAdmin } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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
      default: 'https://avatar.iran.liara.run/public/boy',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: String },
    role: {
      type: String,
      required: true,
      enum: ['super-admin', 'admin', 'trainer', 'staff', 'manager'],
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

adminSchema.statics.isPasswordMatched = async function (
  rowPassword,
  hashedPassword,
) {
  return await bcrypt.compare(rowPassword, hashedPassword);
};

adminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//checking if user is already exist!
adminSchema.statics.isAdminExists = async function (email: string) {
  const existingUser = await Admin.findOne({ email });
  return existingUser;
};

export const Admin = model<IAdmin, AdminMethods>('Admin', adminSchema);
