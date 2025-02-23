import { model, Schema } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Category = model<ICategory>('Category', categorySchema);
