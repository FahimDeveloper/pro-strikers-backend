/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { IUser, UserModel } from './user.interface';

const generalCreditSchema = new Schema(
  {
    session_credit: String,
    machine_credit: String,
  },
  { _id: false },
);

const academyCreditSchema = new Schema(
  {
    session_credit: String,
  },
  { _id: false },
);

const generalMembershipSchema = new Schema(
  {
    membership: { type: Boolean, required: true, default: false },
    status: Boolean,
    issue_date: String,
    expiry_date: String,
    package_name: String,
    plan: { type: String, enum: ['monthly', 'quarterly', 'yearly'] },
    credit_balance: generalCreditSchema,
    credit_date: Date,
  },
  { _id: false },
);

const academyMembershipSchema = new Schema(
  {
    membership: { type: Boolean, required: true, default: false },
    status: Boolean,
    issue_date: String,
    expiry_date: String,
    package_name: String,
    plan: { type: String, enum: ['monthly', 'quarterly', 'yearly'] },
    credit_balance: academyCreditSchema,
    credit_date: Date,
  },
  { _id: false },
);

const userSchema = new Schema<IUser, UserModel>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },

    image: {
      type: String,
      default: 'https://avatar.iran.liara.run/public/boy',
    },

    gender: { type: String, enum: ['male', 'female'] },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: ['user'],
      required: true,
      default: 'user',
    },

    provider: {
      type: String,
      enum: ['email with password', 'google', 'facebook'],
      required: true,
      default: 'email with password',
    },

    verified: { type: Boolean, required: true, default: false },
    waiver_signed: { type: Boolean, required: true, default: false },

    phone: String,
    date_of_birth: String,
    street_address: String,
    zip_code: String,
    city: String,
    state: String,
    country: String,
    nationality: String,

    general_membership: {
      type: generalMembershipSchema,
      required: true,
      default: () => ({ membership: false }),
    },

    academy_membership: {
      type: academyMembershipSchema,
      required: true,
      default: () => ({ membership: false }),
    },

    pass_pack: {
      session_credit: String,
      machine_credit: String,
      issue_date: String,
      expiry_date: String,
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

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password').lean();
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
