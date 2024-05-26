import mongoose from 'mongoose';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    class_name: z.string({
      invalid_type_error: 'class name must be string',
      required_error: 'class name is required',
    }),
    sport: z.string({
      invalid_type_error: 'sport must be string',
      required_error: 'sport is required',
    }),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
        required_error: 'trainer is required',
      })
      .refine(value => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
      }),
    capacity: z.number({
      invalid_type_error: 'capacity must be number',
      required_error: 'capacity is required',
    }),
    start_date: z.string({
      invalid_type_error: 'start date must be string',
      required_error: 'start date is required',
    }),
    end_date: z.string({
      invalid_type_error: 'end date must be string',
      required_error: 'end date is required',
    }),
    start_time: z.string({
      invalid_type_error: 'start time must be string',
      required_error: 'start time is required',
    }),
    end_time: z.string({
      invalid_type_error: 'end time must be string',
      required_error: 'end time is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
  }),
});

const updateValidation = z.object({
  body: z.object({
    class_name: z
      .string({
        invalid_type_error: 'class name must be string',
        required_error: 'class name is required',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
        required_error: 'sport is required',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
        required_error: 'trainer is required',
      })
      .refine(value => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
      })
      .optional(),
    capacity: z
      .number({
        invalid_type_error: 'capacity must be number',
        required_error: 'capacity is required',
      })
      .optional(),
    start_date: z
      .string({
        invalid_type_error: 'start date must be string',
        required_error: 'start date is required',
      })
      .optional(),
    end_date: z
      .string({
        invalid_type_error: 'end date must be string',
        required_error: 'end date is required',
      })
      .optional(),
    start_time: z
      .string({
        invalid_type_error: 'start time must be string',
        required_error: 'start time is required',
      })
      .optional(),
    end_time: z
      .string({
        invalid_type_error: 'end time must be string',
        required_error: 'end time is required',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
        required_error: 'description is required',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'price must be number',
        required_error: 'price is required',
      })
      .optional(),
  }),
});

export const courseScheduleValidations = {
  createValidation,
  updateValidation,
};
