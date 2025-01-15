import { z } from 'zod';
import mongoose from 'mongoose';

const createByAdminValidation = z.object({
  body: z.object({
    user: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User must be a valid ObjectId',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      }),
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
    appointment_date: z.string({
      required_error: 'appointment date is required',
      invalid_type_error: 'appointment date must be a string',
    }),
    sport: z.string({
      required_error: 'Sport is required',
      invalid_type_error: 'Sport must be a string',
    }),
  }),
});

const createByUserValidation = z.object({
  body: z.object({
    appointment_data: z.object({
      user: z
        .string({
          required_error: 'User ID is required',
          invalid_type_error: 'User must be a valid ObjectId',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
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
      appointment_date: z.string({
        required_error: 'appointment date is required',
        invalid_type_error: 'appointment date must be a string',
      }),
      sport: z.string({
        required_error: 'Sport is required',
        invalid_type_error: 'Sport must be a string',
      }),
    }),
    payment_info: z.object({
      transaction_id: z.string({
        required_error: 'Transaction id is required',
        invalid_type_error: 'Transaction id must be a string',
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
      trainer: z
        .string({
          required_error: 'Trainer ID is required',
          invalid_type_error: 'Trainer must be a valid ObjectId',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
    }),
  }),
});

const updateByAdminValidation = z.object({
  body: z.object({
    user: z
      .string({
        required_error: 'User ID is required',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      }),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Invalid email address',
      })
      .optional(),
    appointment: z
      .string({
        invalid_type_error: 'Appointment must be a valid ObjectId',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'Trainer must be a valid ObjectId',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      })
      .optional(),
    appointment_date: z
      .string({
        invalid_type_error: 'appointment date must be a string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'Sport must be a string',
      })
      .optional(),
  }),
});

export const AppointmentGroupReservationValidations = {
  createByAdminValidation,
  createByUserValidation,
  updateByAdminValidation,
};
