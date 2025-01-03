import mongoose, { Schema } from 'mongoose';
import { IOrder, ITimeline } from './order.interface';

const TimelineSchema: Schema = new Schema<ITimeline>(
  {
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

const OrderSchema: Schema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Store',
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      required: true,
    },
    timeline: [TimelineSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
