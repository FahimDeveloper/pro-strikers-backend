import { Schema, model } from 'mongoose';
import { IVoucher } from './voucher.interface';

const voucherSchema = new Schema<IVoucher>(
  {
    voucher_type: {
      type: String,
      required: true,
    },
    discount_type: {
      type: String,
      required: true,
    },
    discount_value: {
      type: Number,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    voucher_code: {
      type: String,
      required: true,
    },
    used: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Voucher = model<IVoucher>('Voucher', voucherSchema);
