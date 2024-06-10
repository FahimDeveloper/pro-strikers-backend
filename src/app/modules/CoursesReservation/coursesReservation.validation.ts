import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user_email must be a valid email',
        required_error: 'user_email is required',
      })
      .email(),
    course: z.string({
      invalid_type_error: 'course must be a valid ObjectId',
      required_error: 'course is required',
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
      invalid_type_error: 'issue_date must be string',
      required_error: 'issue_date is required',
    }),
    course_date: z.string({
      invalid_type_error: 'course_date must be string',
      required_error: 'course_date is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user email must be a valid email',
      })
      .email()
      .optional(),
    course: z
      .string({
        invalid_type_error: 'course must be a valid ObjectId',
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
    issue_date: z
      .string({
        invalid_type_error: 'issue_date must be string',
      })
      .optional(),
    course_date: z
      .string({
        invalid_type_error: 'course_date must be string',
      })
      .optional(),
  }),
});

export const courseReservationValidations = {
  createValidation,
  updateValidation,
};
