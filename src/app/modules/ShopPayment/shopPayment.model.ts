import { model, Schema } from 'mongoose';
import { IShopPayment } from './shopPayment.interface';

const ShopPaymentSchema = new Schema<IShopPayment>(
  {
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const ShopPayment = model<IShopPayment>('ShopPayment', ShopPaymentSchema);

export default ShopPayment;
