import { z } from 'zod';
import mongoose from 'mongoose';

const createValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'User email must be a string',
        required_error: 'User email is required',
      })
      .email('Invalid email format'),
    product_id: z
      .string({
        invalid_type_error: 'Product ID must be a string',
        required_error: 'Product ID is required',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid product ID',
      }),
    status: z.string({
      invalid_type_error: 'Status must be a string',
      required_error: 'Status is required',
    }),
    category: z.string({
      invalid_type_error: 'category must be a string',
      required_error: 'category is required',
    }),
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
      required_error: 'Quantity is required',
    }),
    total_price: z.number({
      invalid_type_error: 'Total price must be a number',
      required_error: 'Total price is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'User email must be a string',
        required_error: 'User email is required',
      })
      .email('Invalid email format')
      .optional(),
    product_id: z
      .string({
        invalid_type_error: 'Product ID must be a string',
        required_error: 'Product ID is required',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid product ID',
      })
      .optional(),
    status: z
      .string({
        invalid_type_error: 'Status must be a string',
        required_error: 'Status is required',
      })
      .optional(),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
        required_error: 'Quantity is required',
      })
      .optional(),
    category: z
      .number({
        invalid_type_error: 'category must be a number',
        required_error: 'category is required',
      })
      .optional(),
    total_price: z
      .number({
        invalid_type_error: 'Total price must be a number',
        required_error: 'Total price is required',
      })
      .optional(),
  }),
});

export const OrderValidations = {
  createValidation,
  updateValidation,
};
