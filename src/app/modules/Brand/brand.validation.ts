import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    brand_name: z.string({
      invalid_type_error: 'brand name must be a string',
      required_error: 'brand name is required',
    }),
    category: z.string({
      invalid_type_error: 'category must be a string',
      required_error: 'category is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be a string',
      required_error: 'description is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    brand_name: z
      .string({
        invalid_type_error: 'brand name must be a string',
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: 'category must be a string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be a string',
      })
      .optional(),
  }),
});

export const BrandValidations = {
  createValidation,
  updateValidation,
};
