import { z } from 'zod';
import mongoose from 'mongoose';

const createValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user email must be a string',
      })
      .email(),
    appointment: z.string({
      invalid_type_error: 'appointment must be a valid ObjectId',
      required_error: 'appointment is required',
    }),
    category: z.string({
      invalid_type_error: 'category must be string',
      required_error: 'category is required',
    }),
    trainer: z.string({
      invalid_type_error: 'trainer must be string',
      required_error: 'trainer is required',
    }),
    booking_date: z.string({
      invalid_type_error: 'booking_date must be string',
      required_error: 'booking_date is required',
    }),
    time_slots: z.array(z.string(), {
      invalid_type_error: 'time_slots must be an array of strings',
      required_error: 'time_slots is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user email must be a string',
      })
      .email()
      .optional(),
    appointment: z
      .string({
        invalid_type_error: 'appointment must be a valid ObjectId',
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: 'category must be string',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
      })
      .optional(),
    booking_date: z
      .string({
        invalid_type_error: 'booking_date must be string',
      })
      .optional(),
    time_slots: z
      .array(z.string(), {
        invalid_type_error: 'time_slots must be an array of strings',
      })
      .optional(),
  }),
});

export const AppointmentOneOnOneReservationValidations = {
  createValidation,
  updateValidation,
};
