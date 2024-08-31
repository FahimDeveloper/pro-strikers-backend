import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user_email must be a valid email',
        required_error: 'user_email is required',
      })
      .email(),
    class: z.string({
      invalid_type_error: 'class must be a valid ObjectId',
      required_error: 'class is required',
    }),
    category: z.string({
      invalid_type_error: 'category must be string',
      required_error: 'category is required',
    }),
    trainer: z.string({
      invalid_type_error: 'trainer must be string',
      required_error: 'trainer is required',
    }),
    issue_date: z.string({
      required_error: 'issue_date is required',
    }),
    class_date: z.string({
      required_error: 'class_date is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user_email must be a valid email',
      })
      .email()
      .optional(),
    class: z
      .string({
        invalid_type_error: 'class must be a valid ObjectId',
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: 'category must be string',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
      })
      .optional(),
    issue_date: z.string().optional(),
    class_date: z.string().optional(),
  }),
});

export const ClassReservationValidations = {
  createValidation,
  updateValidation,
};
