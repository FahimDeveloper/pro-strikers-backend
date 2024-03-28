import { Schema, model } from 'mongoose';
import { NormalUserMethods, TNormalUser } from './normalUser.interface';

const normalUserSchema = new Schema<TNormalUser, NormalUserMethods>(
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

//checking if user is already exist!
normalUserSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await NormalUserModel.findOne({ email });
  return existingUser;
};

export const NormalUserModel = model<TNormalUser, NormalUserMethods>(
  'normalUser',
  normalUserSchema,
);
