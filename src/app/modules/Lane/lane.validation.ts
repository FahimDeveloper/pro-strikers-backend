import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    lane_title: z.string({
      invalid_type_error: 'Lane title must be a string',
      required_error: 'Lane title is required',
    }),
    description: z.string({
      invalid_type_error: 'Description must be a string',
      required_error: 'Description is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    lane_title: z
      .string({
        invalid_type_error: 'Lane title must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .optional(),
  }),
});

export const LaneValidations = {
  createValidation,
  updateValidation,
};
