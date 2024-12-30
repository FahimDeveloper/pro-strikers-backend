import mongoose, { Schema, Document } from 'mongoose';
import { ISize } from './size.interface';

const SizeSchema: Schema = new Schema<ISize>(
  {
    size: { type: String, required: true },
    active: { type: Boolean, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

const Size = mongoose.model<ISize>('Size', SizeSchema);

export default Size;
