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
      facility: z
        .string({
          required_error: 'Facility ID is required',
          invalid_type_error: 'Facility must be a valid ObjectId',
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
    amount: z.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }),
  }),
});

const createByUserValidation = z.object({
  body: z.object({
    facility_data: z.object({
      first_name: z.number({
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
      facility: z
        .string({
          required_error: 'Facility ID is required',
          invalid_type_error: 'Facility must be a valid ObjectId',
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
    // membership_info: z
    //   .object({
    //     user_id: z.string({
    //       required_error: 'User ID is required',
    //       invalid_type_error: 'User ID must be a string',
    //     }),
    //     membership: z.object({
    //       package: z.string({
    //         required_error: 'Package is required',
    //         invalid_type_error: 'Package must be a string',
    //       }),
    //       plan: z.string({
    //         required_error: 'Plan is required',
    //         invalid_type_error: 'Plan must be a string',
    //       }),
    //       status: z.boolean({
    //         required_error: 'Status is required',
    //         invalid_type_error: 'Status must be a boolean',
    //       }),
    //       membership: z.boolean({
    //         required_error: 'Membership is required',
    //         invalid_type_error: 'Membership must be a boolean',
    //       }),
    //       issue_date: z.string({
    //         required_error: 'Issue date is required',
    //         invalid_type_error: 'Issue date must be a string',
    //       }),
    //       expiry_date: z.string({
    //         required_error: 'Expiry date is required',
    //         invalid_type_error: 'Expiry date must be a string',
    //       }),
    //     }),
    //   })
    //   .optional(),
    payment_info: z.object({
      transaction_id: z.string(),
      user: z.string({
        required_error: 'user is required',
        invalid_type_error: 'user must be a string',
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
      service: z.string({
        required_error: 'service is required',
        invalid_type_error: 'service must be a string',
      }),
    }),
  }),
});

// Zod Schema for AppointmentGroupReservation (Update)
const updateByAdminValidation = z.object({
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
