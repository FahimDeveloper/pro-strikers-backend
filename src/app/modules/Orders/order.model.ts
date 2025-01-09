import mongoose, { Schema } from 'mongoose';
import { IOrder, ITimeline } from './order.interface';

const TimelineSchema: Schema = new Schema<ITimeline>(
  {
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
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
    order_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
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
      enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
      default: 'pending',
      required: true,
    },
    pickup_point: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street_address: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
    timeline: [TimelineSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
