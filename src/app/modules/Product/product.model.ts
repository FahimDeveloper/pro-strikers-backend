import { Schema, model } from 'mongoose';
import { IProduct, IVariation } from './product.interface';

const variationSchema = new Schema<IVariation>(
  {
    color: {
      color_code: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
  },
  { _id: false, versionKey: false },
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    gallery: [
      {
        type: String,
        required: true,
      },
    ],
    regular_price: {
      type: Number,
      required: true,
    },
    offer_price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    color: {
      color_code: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    size: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'bats',
        'gloves',
        'soccer items',
        'wearables',
        'helmets',
        'sports bags',
      ],
    },
    brand: {
      type: String,
      required: true,
    },
    variations: [
      {
        type: variationSchema,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model<IProduct>('Product', productSchema);
