/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    image: {
      type: String,
      required: true,
      default: 'https://avatar.iran.liara.run/public/boy',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
    provider: {
      type: String,
      required: true,
      default: 'email with password',
    },
    phone: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    nationality: {
      type: String,
    },
    street_address: {
      type: String,
    },
    membership: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
    },
    issue_date: {
      type: String,
    },
    expiry_date: {
      type: String,
    },
    package_name: {
      type: String,
    },
    plan: {
      type: String,
      enum: ['monthly', 'yearly'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
