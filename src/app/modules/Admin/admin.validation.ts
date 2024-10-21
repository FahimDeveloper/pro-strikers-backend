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
    image: z.any(),
    phone: z.string({
      invalid_type_error: 'phone must be string',
      required_error: 'phone is required',
    }),
    gender: z.enum(['male', 'female']),
    date_of_birth: z.string({
      invalid_type_error: 'date_of_birth must be string',
    }),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({ message: 'Please enter a valid email address' }),
    role: z.enum(['super-admin', 'admin', 'trainer', 'staff', 'manager']),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    first_name: z
      .string({
        invalid_type_error: 'first name must be string',
      })
      .optional(),
    last_name: z
      .string({
        invalid_type_error: 'last name must be string',
      })
      .optional(),
    image: z.any().optional(),
    phone: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    date_of_birth: z
      .string({ invalid_type_error: 'date_of_birth must be string' })
      .optional(),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({ message: 'Please enter a valid email address' })
      .optional(),
    role: z
      .enum(['super-admin', 'admin', 'trainer', 'staff', 'manager'])
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
      })
      .optional(),
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .optional(),
  }),
});

export const adminValidations = {
  createValidation,
  updateValidation,
};
