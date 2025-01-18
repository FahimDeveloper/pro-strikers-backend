import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    event_data: z.object({
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

export const EventIndividualResrvationValidations = {
  createValidation,
};
