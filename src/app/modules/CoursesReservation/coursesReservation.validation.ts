import mongoose from 'mongoose';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    course_data: z.object({
      user: z
        .string({
          invalid_type_error: 'User ID must be a string',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email'),
      course: z.string({
        required_error: 'Bootcamp ID is required',
        invalid_type_error: 'Bootcamp ID must be a string',
      }),
      sport: z.string({
        required_error: 'sport is required',
        invalid_type_error: 'sport must be a string',
      }),
    }),
    payment_info: z.object({
      transaction_id: z.string({
        required_error: 'Transaction id is required',
        invalid_type_error: 'Transaction id must be a string',
      }),
      trainer: z
        .string({
          required_error: 'trainer is required',
          invalid_type_error: 'trainer must be a string',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
      email: z
        .string({
          required_error: 'email is required',
          invalid_type_error: 'email must be a string',
        })
        .email('Invalid email address'),
      amount: z.number({
        required_error: 'amount is required',
        invalid_type_error: 'amount must be a number',
      }),
    }),
  }),
});

export const courseReservationValidations = {
  createValidation,
};
