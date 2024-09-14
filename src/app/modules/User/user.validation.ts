import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    first_name: z.string({
      invalid_type_error: 'first name must be string',
      required_error: 'first name is required',
    }),
    last_name: z
      .string({
        invalid_type_error: 'last name must be string',
      })
      .optional(),
    gender: z.enum(['male', 'female']).optional(),
    email: z
      .string({
        invalid_type_error: 'email must be string',
        required_error: 'email is required',
      })
      .email({
        message: 'Please enter a valid email address',
      }),
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .optional(),
    provider: z
      .enum(['email with password', 'google', 'facebook'])
      .default('email with password'),
    role: z.enum(['user']).default('user'),
    phone: z
      .string({
        invalid_type_error: 'phone must be string',
      })
      .optional(),
    city: z
      .string({
        invalid_type_error: 'city must be string',
      })
      .optional(),
    state: z
      .string({
        invalid_type_error: 'state must be string',
      })
      .optional(),
    street_address: z
      .string({
        invalid_type_error: 'streed address must be string',
      })
      .optional(),
    nationality: z
      .string({
        invalid_type_error: 'nationality must be string',
      })
      .optional(),
    country: z
      .string({
        invalid_type_error: 'county must be string',
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
      .default(false),
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
      provider: z
        .enum(['email with password', 'google', 'facebook'])
        .optional(),
      role: z.enum(['user']).optional(),
      phone: z
        .string({
          invalid_type_error: 'phone must be string',
        })
        .optional(),
      city: z
        .string({
          invalid_type_error: 'city must be string',
        })
        .optional(),
      state: z
        .string({
          invalid_type_error: 'state must be string',
        })
        .optional(),
      street_address: z
        .string({
          invalid_type_error: 'streed address must be string',
        })
        .optional(),
      nationality: z
        .string({
          invalid_type_error: 'nationality must be string',
        })
        .optional(),
      country: z
        .string({
          invalid_type_error: 'county must be string',
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
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be boolean',
    })
    .optional()
    .default(false),
});

export const UserValidations = {
  createValidation,
  updateValidation,
};
