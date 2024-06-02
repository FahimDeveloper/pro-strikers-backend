import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
      required_error: 'title must be required',
    }),
    image: z.any(),
    category: z.string({
      invalid_type_error: 'category must be string',
      required_error: 'category must be required',
    }),
    description: z.string({
      invalid_type_error: 'descripton must be string',
      required_error: 'descripton must be required',
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
    image: z.any().optional(),
    category: z
      .string({
        invalid_type_error: 'category must be string',
        required_error: 'category must be required',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'descripton must be string',
        required_error: 'descripton must be required',
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
