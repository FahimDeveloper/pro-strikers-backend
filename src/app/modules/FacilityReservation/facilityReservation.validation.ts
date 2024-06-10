import { z } from 'zod';
import mongoose from 'mongoose';

const createValidation = z.object({
  body: z.object({
    user_email: z
      .string({
        invalid_type_error: 'user_email must be a valid email',
        required_error: 'user_email is required',
      })
      .email(),
    facility: z.string({
      invalid_type_error: 'facility must be a valid ObjectId',
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
    facility_date: z.string({
      invalid_type_error: 'facility_date must be string',
      required_error: 'facility_date is required',
    }),
    time_slots: z.array(z.string(), {
      invalid_type_error: 'time_slots must be an array of strings',
      required_error: 'time_slots are required',
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
    facility: z
      .string({
        invalid_type_error: 'facility must be a valid ObjectId',
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
    facility_date: z
      .string({
        invalid_type_error: 'facility_date must be string',
      })
      .optional(),
    time_slots: z
      .array(z.string(), {
        invalid_type_error: 'time_slots must be an array of strings',
      })
      .optional(),
  }),
});

export const FacilityReservationValidations = {
  createValidation,
  updateValidation,
};
