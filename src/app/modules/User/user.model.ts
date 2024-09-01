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
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: 'https://avatar.iran.liara.run/public/boy',
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
    phone: {
      type: String,
      required: true,
    },
    date_of_birth: {
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
      type: Date,
    },
    expiry_date: {
      type: Date,
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

// userSchema.pre('save', async function (next) {
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
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
