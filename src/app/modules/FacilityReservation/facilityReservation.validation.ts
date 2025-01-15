import mongoose from 'mongoose';
import { z } from 'zod';

// Zod Schema for AppointmentBookings
const appointmentBookingsSchemaValidation = z.object({
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

const createByAdminValidation = z.object({
  body: z.object({
    facility_data: z.object({
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
      facility: z
        .string({
          required_error: 'Facility ID is required',
          invalid_type_error: 'Facility must be a valid ObjectId',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
      sport: z.string({
        required_error: 'Sport is required',
        invalid_type_error: 'Sport must be a string',
      }),
      bookings: z.array(appointmentBookingsSchemaValidation, {
        required_error: 'Bookings are required',
        invalid_type_error: 'Bookings must be array of object',
      }),
      addons: z
        .array(
          z.object(
            {
              name: z.string({
                required_error: 'addon name is required',
                invalid_type_error: 'addon name must be string',
              }),
              hours: z.number({
                required_error: 'addon hours is required',
                invalid_type_error: 'addon hours must be number',
              }),
              image: z.string({
                required_error: 'addon image is required',
                invalid_type_error: 'addon image must be number',
              }),
              price: z.number({
                required_error: 'addon price is required',
                invalid_type_error: 'addon price must be number',
              }),
              ini_price: z.number({
                required_error: 'addon initial price is required',
                invalid_type_error: 'addon initial price must be number',
              }),
            },
            { invalid_type_error: 'addons must be array of object' },
          ),
        )
        .optional(),
    }),
  }),
});

const createByUserValidation = z.object({
  body: z.object({
    facility_data: z.object({
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
      facility: z
        .string({
          required_error: 'Facility ID is required',
          invalid_type_error: 'Facility must be a valid ObjectId',
        })
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
      sport: z.string({
        required_error: 'Sport is required',
        invalid_type_error: 'Sport must be a string',
      }),
      bookings: z.array(appointmentBookingsSchemaValidation, {
        required_error: 'Bookings are required',
        invalid_type_error: 'Bookings must be array of object',
      }),
      addons: z
        .array(
          z.object(
            {
              name: z.string({
                required_error: 'addon name is required',
                invalid_type_error: 'addon name must be string',
              }),
              hours: z.number({
                required_error: 'addon hours is required',
                invalid_type_error: 'addon hours must be number',
              }),
              image: z.string({
                required_error: 'addon image is required',
                invalid_type_error: 'addon image must be number',
              }),
              price: z.number({
                required_error: 'addon price is required',
                invalid_type_error: 'addon price must be number',
              }),
              ini_price: z.number({
                required_error: 'addon initial price is required',
                invalid_type_error: 'addon initial price must be number',
              }),
            },
            { invalid_type_error: 'addons must be array of object' },
          ),
        )
        .optional(),
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
    }),
  }),
});

// Zod Schema for AppointmentGroupReservation (Update)
const updateByAdminValidation = z.object({
  body: z.object({
    user: z
      .string({
        invalid_type_error: 'User must be a valid ObjectId',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
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
    appointment: z
      .string({
        invalid_type_error: 'Appointment must be a valid ObjectId',
      })
      .refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid ObjectId',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'Sport must be a string',
      })
      .optional(),
    bookings: z
      .array(appointmentBookingsSchemaValidation, {
        invalid_type_error: 'Bookings must be array of object',
      })
      .optional(),
    addons: z
      .array(
        z.object(
          {
            name: z.string({
              invalid_type_error: 'addon name must be string',
            }),
            hours: z.number({
              invalid_type_error: 'addon hours must be number',
            }),
            image: z.string({
              invalid_type_error: 'addon image must be number',
            }),
            price: z.number({
              invalid_type_error: 'addon price must be number',
            }),
            ini_price: z.number({
              invalid_type_error: 'addon initial price must be number',
            }),
          },
          { invalid_type_error: 'addons must be array of object' },
        ),
      )
      .optional(),
  }),
});

export const FacilityReservationValidations = {
  createByAdminValidation,
  updateByAdminValidation,
  createByUserValidation,
};
