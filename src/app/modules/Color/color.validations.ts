import { z } from 'zod';

const colorSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required',
  }),
  color_code: z.string({
    invalid_type_error: 'Color code must be a string',
    required_error: 'Color code is required',
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required',
  }),
  active: z.boolean({
    invalid_type_error: 'Active must be a boolean',
    required_error: 'Active is required',
  }),
});

const createValidation = z.object({
  body: colorSchema,
});

const updateValidation = z.object({
  body: colorSchema.partial(),
});

export const ColorValidations = { createValidation, updateValidation };
