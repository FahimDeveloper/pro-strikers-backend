import { z } from 'zod';
import mongoose from 'mongoose';

const orderProductSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email Address' }),
  product: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid product ID',
  }),
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
    required_error: 'Quantity is required',
  }),
  color: z.string({
    invalid_type_error: 'Color must be a string',
    required_error: 'Color is required',
  }),
  size: z.string({
    invalid_type_error: 'Size must be a string',
    required_error: 'Size is required',
  }),
  total_price: z.number({
    invalid_type_error: 'Total Price must be a number',
    required_error: 'Total Price is required',
  }),
  status: z
    .enum(['pending', 'processing', 'shipped', 'delivered', 'canceled'], {
      invalid_type_error:
        'Status must be one of: pending, processing, shipped, delivered, canceled',
      required_error: 'Status is required',
    })
    .default('pending'),
  order_id: z.string({
    invalid_type_error: 'Order Id must be a string',
    required_error: 'Order Id is required',
  }),
  pickup_point: z.string({
    invalid_type_error: 'pickup point must be a string',
    required_error: 'pickup point is required',
  }),
  city: z.string({
    invalid_type_error: 'city must be a string',
    required_error: 'city is required',
  }),
  country: z.string({
    invalid_type_error: 'country must be a string',
    required_error: 'country is required',
  }),
  state: z.string({
    invalid_type_error: 'state must be a string',
    required_error: 'state is required',
  }),
  phone: z.string({
    invalid_type_error: 'phone must be a string',
    required_error: 'phone is required',
  }),
  street_address: z.string({
    invalid_type_error: 'street_address must be a string',
    required_error: 'street_address is required',
  }),
  zip_code: z.string({
    invalid_type_error: 'zip_code must be a string',
    required_error: 'zip_code is required',
  }),

  timeline: z.array(
    z.object({
      status: z.enum(
        ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
        {
          invalid_type_error:
            'Status must be one of: pending, processing, shipped, delivered, canceled',
          required_error: 'Status is required',
        },
      ),
      note: z.string({
        invalid_type_error: 'Note must be a string',
        required_error: 'Note is required',
      }),
      date: z.string({
        invalid_type_error: 'Date must be a valid ISO string',
        required_error: 'Date is required',
      }),
    }),
  ),
});

const createValidation = z.object({
  body: z.object({
    orders: z.array(orderProductSchema),
  }),
});

const updateValidation = z.object({
  body: z.object({
    status: z.enum(
      ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
      {
        invalid_type_error:
          'Status must be one of: pending, processing, shipped, delivered, canceled',
        required_error: 'Status is required',
      },
    ),
  }),
});

export const OrderValidations = { createValidation, updateValidation };
