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
    gender: z.enum(['male', 'female']),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({
        message: 'Please enter a valid email address',
      }),
    password: z.string({
      invalid_type_error: 'password must be string',
      required_error: 'password is required',
    }),
    role: z.enum(['user']).default('user'),
    phone: z.string({
      invalid_type_error: 'phone must be string',
      required_error: 'phone is required',
    }),
    date_of_birth: z
      .string({
        invalid_type_error: 'date of birth must be string',
      })
      .optional(),
    membership: z.boolean({
      invalid_type_error: 'membership must be boolean',
      required_error: 'membership is required',
    }),
    status: z
      .boolean({
        invalid_type_error: 'status must be boolean',
      })
      .optional(),
    issue_date: z
      .string({
        invalid_type_error: 'issue data must be string',
      })
      .optional(),
    expiry_date: z
      .string({
        invalid_type_error: 'expiry data must be string',
      })
      .optional(),
    package_name: z
      .string({
        invalid_type_error: 'package name must be string',
      })
      .optional(),
    plan: z.enum(['monthly', 'yearly']).optional(),
  }),
});

const updateValidation = z.object({
  body: z
    .object({
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
      gender: z.enum(['male', 'female']).optional(),
      email: z
        .string({
          invalid_type_error: 'email must be string',
        })
        .email({
          message: 'Please enter a valid email address',
        })
        .optional(),
      password: z
        .string({
          invalid_type_error: 'password must be string',
        })
        .optional(),
      role: z.enum(['user']).optional(),
      phone: z
        .string({
          invalid_type_error: 'phone must be string',
        })
        .optional(),
      date_of_birth: z
        .string({
          invalid_type_error: 'date of birth must be string',
        })
        .optional(),
      membership: z
        .boolean({
          invalid_type_error: 'membership must be boolean',
        })
        .optional(),
      status: z
        .boolean({
          invalid_type_error: 'status must be boolean',
        })
        .optional(),
      issue_date: z
        .string({
          invalid_type_error: 'issue data must be string',
        })
        .optional(),
      expiry_date: z
        .string({
          invalid_type_error: 'expiry data must be string',
        })
        .optional(),
      package_name: z
        .string({
          invalid_type_error: 'package name must be string',
        })
        .optional(),
      plan: z.enum(['monthly', 'yearly']).optional(),
    })
    .optional(),
});

export const UserValidations = {
  createValidation,
  updateValidation,
};
