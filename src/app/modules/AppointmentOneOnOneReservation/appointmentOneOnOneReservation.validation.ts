import mongoose from 'mongoose';
import { z } from 'zod';

// Zod Schema for AppointmentBookings
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

// Zod Schema for AppointmentGroupReservation (Create)
const createValidation = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    }),
    last_name: z.string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Invalid email address',
      }),
    phone: z.string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    }),
    age: z.number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
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
    street_address: z.string({
      required_error: 'Street address is required',
      invalid_type_error: 'Street address must be a string',
    }),
    city: z.string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    }),
    state: z.string({
      required_error: 'State is required',
      invalid_type_error: 'State must be a string',
    }),
    sport: z.string({
      required_error: 'Sport is required',
      invalid_type_error: 'Sport must be a string',
    }),
    zip_code: z.string({
      required_error: 'Zip code is required',
      invalid_type_error: 'Zip code must be a string',
    }),
    bookings: z.array(AppointmentBookingsSchema, {
      required_error: 'Bookings are required',
    }),
  }),
});

// Zod Schema for AppointmentGroupReservation (Update)
const updateValidation = z.object({
  body: z.object({
    first_name: z
      .string({
        invalid_type_error: 'First name must be a string',
      })
      .optional(),
    last_name: z
      .string({
        invalid_type_error: 'Last name must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Invalid email address',
      })
      .optional(),
    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .optional(),
    age: z
      .number({
        invalid_type_error: 'Age must be a number',
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
    street_address: z
      .string({
        invalid_type_error: 'Street address must be a string',
      })
      .optional(),
    city: z
      .string({
        invalid_type_error: 'City must be a string',
      })
      .optional(),
    state: z
      .string({
        invalid_type_error: 'State must be a string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'Sport must be a string',
      })
      .optional(),
    zip_code: z
      .string({
        invalid_type_error: 'Zip code must be a string',
      })
      .optional(),
  }),
});

export const AppointmentOneOnOneReservationValidations = {
  createValidation,
  updateValidation,
};
