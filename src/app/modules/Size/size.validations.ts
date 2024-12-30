import { z } from 'zod';

const sizeSchema = z.object({
  size: z.string({
    invalid_type_error: 'Size must be a string',
    required_error: 'Size is required',
  }),
  active: z.boolean({
    invalid_type_error: 'Active must be a boolean',
    required_error: 'Active is required',
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required',
  }),
});

const createValidation = z.object({
  body: sizeSchema,
});

const updateValidation = z.object({
  body: sizeSchema.partial(),
});

export const SizeValidations = { createValidation, updateValidation };
