import mongoose, { Schema, Document } from 'mongoose';
import { IColor } from './color.interface';

const ColorSchema: Schema = new Schema<IColor>({
  name: { type: String, required: true },
  color_code: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },
});

const Color = mongoose.model<IColor>('Color', ColorSchema);

export default Color;
