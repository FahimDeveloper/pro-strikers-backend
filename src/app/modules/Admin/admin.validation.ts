import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    first_name: z.string({
      invalid_type_error: 'first name must be string',
      required_error: 'first name is required',
    }),
    last_name: z.string({
      invalid_type_error: 'last name must be string',
      required_error: 'last name is required',
    }),
    image: z.string({
      invalid_type_error: 'image must be string',
      required_error: 'image is required',
    }),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({ message: 'Please enter a valid email address' }),
    role: z.enum(['superAdmin', 'admin', 'trainer']),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    password: z.string({
      invalid_type_error: 'password must be string',
      required_error: 'password is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    first_name: z
      .string({
        invalid_type_error: 'first name must be string',
        required_error: 'first name is required',
      })
      .optional(),
    last_name: z
      .string({
        invalid_type_error: 'last name must be string',
        required_error: 'last name is required',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'image must be string',
        required_error: 'image is required',
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({ message: 'Please enter a valid email address' })
      .optional(),
    role: z.enum(['superAdmin', 'admin', 'trainer']).optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
        required_error: 'description is required',
      })
      .optional(),
    password: z
      .string({
        invalid_type_error: 'password must be string',
        required_error: 'password is required',
      })
      .optional(),
  }),
});

export const adminValidations = {
  createValidation,
  updateValidation,
};
