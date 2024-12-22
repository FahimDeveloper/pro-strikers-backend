import { z } from 'zod';
import mongoose from 'mongoose';

const orderProductSchema = z.object({
  user_email: z
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
    .enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], {
      invalid_type_error:
        'Status must be one of: pending, processing, shipped, delivered, cancelled',
      required_error: 'Status is required',
    })
    .default('pending'),
  timeline: z.array(
    z.object({
      status: z.enum(
        ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        {
          invalid_type_error:
            'Status must be one of: pending, processing, shipped, delivered, cancelled',
          required_error: 'Status is required',
        },
      ),
      note: z.string({
        invalid_type_error: 'Note must be a string',
        required_error: 'Note is required',
      }),
      date: z.date({
        invalid_type_error: 'Date must be a valid date',
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
      ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      {
        invalid_type_error:
          'Status must be one of: pending, processing, shipped, delivered, cancelled',
        required_error: 'Status is required',
      },
    ),
  }),
});

export const OrderValidations = { createValidation, updateValidation };
