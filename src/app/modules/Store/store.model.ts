import { Schema, model } from 'mongoose';
import { INonPriceVariation, IPriceVariation, IStore } from './store.interface';

const priceVariationsSchema = new Schema<IPriceVariation>({
  variation_type: {
    type: String,
  },
  variation_value: {
    type: String,
  },
  variation_price: {
    type: Number,
  },
});

const nonPriceVariationsSchema = new Schema<INonPriceVariation>({
  variation_type: {
    type: String,
  },
  variation_value: {
    type: [String],
  },
});

const storeSchema = new Schema<IStore>(
  {
    product_name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price_variation: {
      type: Boolean,
      required: true,
    },
    price_variations: [priceVariationsSchema],
    non_price_variation: {
      type: Boolean,
      required: true,
    },
    non_price_variations: [nonPriceVariationsSchema],
  },
  { timestamps: true, versionKey: false },
);

export const Store = model<IStore>('Store', storeSchema);
