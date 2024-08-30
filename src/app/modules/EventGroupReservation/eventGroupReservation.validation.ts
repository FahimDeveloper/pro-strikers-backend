import { z } from 'zod';

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
      .email('Invalid email'),
    phone: z.string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    }),
    event: z.string({
      required_error: 'Event ID is required',
      invalid_type_error: 'Event ID must be a string',
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
    team_name: z.string({
      required_error: 'Team name is required',
      invalid_type_error: 'Team name must be a string',
    }),
    team: z.array(
      z.object({
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
        contact: z.string({
          required_error: 'Contact number is required',
          invalid_type_error: 'Contact number must be a string',
        }),
        age: z.number({
          required_error: 'Age is required',
          invalid_type_error: 'Age must be a number',
        }),
      }),
    ),
  }),
});

const updateValidation = z.object({
  body: z.object({
    first_name: z
      .string({
        required_error: 'First name is required',
      })
      .optional(),
    last_name: z
      .string({
        required_error: 'Last name is required',
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
    event: z
      .string({
        invalid_type_error: 'Event ID must be a string',
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
    team_name: z
      .string({
        required_error: 'Team name is required',
      })
      .optional(),
    team: z
      .array(
        z
          .object({
            first_name: z
              .string({
                required_error: 'First name is required',
              })
              .optional(),
            last_name: z
              .string({
                required_error: 'Last name is required',
              })
              .optional(),
            email: z
              .string({
                required_error: 'Email is required',
              })
              .email('Invalid email')
              .optional(),
            contact: z
              .string({
                required_error: 'Contact number is required',
              })
              .optional(),
            age: z
              .number({
                required_error: 'Age is required',
              })
              .optional(),
          })
          .optional(),
      )
      .optional(),
  }),
});

export const EventGroupResrvationValidations = {
  createValidation,
  updateValidation,
};
