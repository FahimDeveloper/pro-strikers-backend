import { Schema, model } from 'mongoose';
import { IProduct, IVariation } from './product.interface';

const variationSchema = new Schema<IVariation>(
  {
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { _id: false, versionKey: false },
);

// Product Schema
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
    price: {
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
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productSchema);
