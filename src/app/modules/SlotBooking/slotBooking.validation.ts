import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required.',
      invalid_type_error: 'id must be a string.',
    }),
    training: z
      .string({
        invalid_type_error: 'training must be a string.',
      })
      .optional(),
    user: z.string({
      required_error: 'User is required.',
      invalid_type_error: 'User must be a valid string.',
    }),
    time_slot: z.string({
      required_error: 'Time slot is required.',
      invalid_type_error: 'Time slot must be a string.',
    }),
    date: z.string({
      required_error: 'Date is required.',
      invalid_type_error: 'Date must be a string.',
    }),
    lane: z
      .string({
        invalid_type_error: 'Lane must be a string.',
      })
      .optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    id: z
      .string({
        required_error: 'id is required.',
      })
      .optional(),
    training: z
      .string({
        invalid_type_error: 'training must be a valid string.',
      })
      .optional(),
    user: z
      .string({
        invalid_type_error: 'User must be a valid string.',
      })
      .optional(),
    time_slot: z
      .string({
        invalid_type_error: 'Time slot must be a string.',
      })
      .optional(),
    date: z
      .string({
        invalid_type_error: 'Date must be a string.',
      })
      .optional(),
  }),
});

export const SlotBookingValidations = {
  createValidation,
  updateValidation,
};
