import mongoose from 'mongoose';
import { z } from 'zod';

const AppointmentBookingsSchema = z.object({
  date: z.string({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a string',
  }),
  time_slot: z.string({
    required_error: 'Time slot is required',
    invalid_type_error: 'Time slot must be a string',
  }),
  training: z
    .string({
      required_error: 'Training ID is required',
      invalid_type_error: 'Training must be a valid ObjectId',
    })
    .refine(val => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId',
    }),
});

const createValidation = z.object({
  body: z.object({
    appointment_data: z.object({
      user: z
        .string({
          invalid_type_error: 'user is must be string',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email({
          message: 'Invalid email address',
        }),

      appointment: z
        .string({
          required_error: 'Appointment ID is required',
          invalid_type_error: 'Appointment must be a valid ObjectId',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
      trainer: z
        .string({
          required_error: 'Trainer ID is required',
          invalid_type_error: 'Trainer must be a valid ObjectId',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
      sport: z.string({
        required_error: 'Sport is required',
        invalid_type_error: 'Sport must be a string',
      }),
      bookings: z.array(AppointmentBookingsSchema, {
        required_error: 'Bookings are required',
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

export const AppointmentOneOnOneReservationValidations = {
  createValidation,
};
