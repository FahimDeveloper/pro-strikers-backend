import mongoose, { Schema, Document } from 'mongoose';
import { IColor } from './color.interface';

const ColorSchema: Schema = new Schema<IColor>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    color_code: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Color = mongoose.model<IColor>('Color', ColorSchema);

export default Color;
