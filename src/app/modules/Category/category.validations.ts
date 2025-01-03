import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required',
    }),
    slug: z.string({
      invalid_type_error: 'slug must be a string',
      required_error: 'slug is required',
    }),
    description: z
      .string({
        invalid_type_error: 'description must be a string',
      })
      .optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be a string',
      })
      .optional(),
    slug: z
      .string({
        invalid_type_error: 'slug must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be a string',
      })
      .optional(),
  }),
});

export const CategoryValidations = { createValidation, updateValidation };
