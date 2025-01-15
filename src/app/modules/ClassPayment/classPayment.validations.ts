import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdValidation = z
  .string({
    required_error: 'Trainer is required',
    invalid_type_error: 'Trainer must be a valid ObjectId as a string',
  })
  .refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid trainer id format',
  });

const createValidation = z.object({
  body: z.object({
    transaction_id: z.string({
      required_error: 'Transaction ID is required',
      invalid_type_error: 'Transaction ID must be a string',
    }),
    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }),
    trainer: objectIdValidation,
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address'),
  }),
});

const updateValidation = z.object({
  body: z.object({
    transaction_id: z
      .string({
        invalid_type_error: 'Transaction ID must be a string',
      })
      .optional(),
    amount: z
      .number({
        invalid_type_error: 'Amount must be a number',
      })
      .optional(),
    trainer: objectIdValidation.optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address')
      .optional(),
  }),
});

export const ClassPaymentValidations = {
  createValidation,
  updateValidation,
};
