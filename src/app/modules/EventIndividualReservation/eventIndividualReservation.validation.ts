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
    event: z.string({
      required_error: 'Event ID is required',
      invalid_type_error: 'Event ID must be a string',
    }),
    sport: z.string({
      required_error: 'Sport is required',
      invalid_type_error: 'Sport must be a string',
    }),
  }),
});

const createByUserValidation = z.object({
  body: z.object({
    event_data: z.object({
      user: z.string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      }),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email'),
      event: z.string({
        required_error: 'Event ID is required',
        invalid_type_error: 'Event ID must be a string',
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
    }),
  }),
});

const updateByAdminValidation = z.object({
  body: z.object({
    user: z
      .string({
        invalid_type_error: 'User ID must be a string',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email')
      .optional(),
    event: z
      .string({
        invalid_type_error: 'Event ID must be a string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'Sport must be a string',
      })
      .optional(),
  }),
});

export const EventIndividualResrvationValidations = {
  createByAdminValidation,
  updateByAdminValidation,
  createByUserValidation,
};
