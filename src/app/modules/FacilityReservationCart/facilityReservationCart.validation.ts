import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    facility: z.string({
      required_error: 'Facility is required.',
      invalid_type_error: 'Facility must be a valid ObjectId string.',
    }),
    user: z.string({
      required_error: 'User is required.',
      invalid_type_error: 'User must be a valid ObjectId string.',
    }),
    time_slot: z.string({
      required_error: 'Time slot is required.',
      invalid_type_error: 'Time slot must be a string.',
    }),
    date: z.string({
      required_error: 'Date is required.',
      invalid_type_error: 'Date must be a string.',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    facility: z
      .string({
        invalid_type_error: 'Facility must be a valid ObjectId string.',
      })
      .optional(),
    user: z
      .string({
        invalid_type_error: 'User must be a valid ObjectId string.',
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

export const FacilityCartReservationValidations = {
  createValidation,
  updateValidation,
};
