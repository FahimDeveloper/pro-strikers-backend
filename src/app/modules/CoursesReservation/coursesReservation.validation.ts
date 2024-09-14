import { z } from 'zod';

const createByAdminValidation = z.object({
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
      .email('Invalid email'),
    phone: z.string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    }),
    course: z.string({
      required_error: 'Bootcamp ID is required',
      invalid_type_error: 'Bootcamp ID must be a string',
    }),
    age: z.number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    }),
    street_address: z.string({
      required_error: 'Street address is required',
      invalid_type_error: 'Street address must be a string',
    }),
    city: z.string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    }),
    sport: z.string({
      required_error: 'sport is required',
      invalid_type_error: 'sport must be a string',
    }),
    zip_code: z.string({
      required_error: 'Zip code is required',
      invalid_type_error: 'Zip code must be a string',
    }),
  }),
});

const createByUserValidation = z.object({
  body: z.object({
    course_data: z.object({
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
        .email('Invalid email'),
      phone: z.string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      }),
      course: z.string({
        required_error: 'Bootcamp ID is required',
        invalid_type_error: 'Bootcamp ID must be a string',
      }),
      age: z.number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be a number',
      }),
      street_address: z.string({
        required_error: 'Street address is required',
        invalid_type_error: 'Street address must be a string',
      }),
      city: z.string({
        required_error: 'City is required',
        invalid_type_error: 'City must be a string',
      }),
      sport: z.string({
        required_error: 'sport is required',
        invalid_type_error: 'sport must be a string',
      }),
      zip_code: z.string({
        required_error: 'Zip code is required',
        invalid_type_error: 'Zip code must be a string',
      }),
    }),
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
      .email('Invalid email')
      .optional(),
    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .optional(),
    course: z
      .string({
        invalid_type_error: 'Bootcamp ID must be a string',
      })
      .optional(),
    age: z
      .number({
        invalid_type_error: 'Age must be a number',
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

export const courseReservationValidations = {
  createByAdminValidation,
  createByUserValidation,
  updateByAdminValidation,
};
