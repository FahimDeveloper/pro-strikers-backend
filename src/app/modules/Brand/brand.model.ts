import { model, Schema } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>(
  {
    brand_name: { type: String, required: true },
    brand_logo: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Brand = model<IBrand>('Brand', brandSchema);
