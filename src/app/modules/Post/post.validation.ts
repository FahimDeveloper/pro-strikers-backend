import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
      required_error: 'title must be required',
    }),
    image: z.string({
      invalid_type_error: 'image must be string',
      required_error: 'image must be required',
    }),
    content: z.string({
      invalid_type_error: 'content must be string',
      required_error: 'content must be required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'title must be string',
        required_error: 'title must be required',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'image must be string',
        required_error: 'image must be required',
      })
      .optional(),
    content: z
      .string({
        invalid_type_error: 'content must be string',
        required_error: 'content must be required',
      })
      .optional(),
  }),
});

export const PostValidations = {
  createValidation,
  updateValidation,
};
