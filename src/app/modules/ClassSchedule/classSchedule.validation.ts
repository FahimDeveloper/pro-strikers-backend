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
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    facility: z.string({
      invalid_type_error: 'facility must be string',
      required_error: 'facility is required',
    }),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
        required_error: 'trainer is required',
      })
      .refine(value => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
      }),
    level: z.string({
      invalid_type_error: 'level must be string',
      required_error: 'level is required',
    }),
    capacity: z.number({
      invalid_type_error: 'capacity must be number',
      required_error: 'capacity is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
    schedules: z.array(
      z.object({
        day: z.string({
          invalid_type_error: 'day must be string',
          required_error: 'day is required',
        }),
        active: z.boolean({
          invalid_type_error: 'active must be boolean',
          required_error: 'active is required',
        }),
        start_time: z
          .string({
            invalid_type_error: 'start time must be string',
            required_error: 'start time is required',
          })
          .date()
          .optional(),
        end_time: z
          .string({
            invalid_type_error: 'end time must be string',
            required_error: 'end time is required',
          })
          .date()
          .optional(),
      }),
      {
        required_error: 'schedules are required',
        invalid_type_error: 'schedules are must be an array of objects',
      },
    ),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updateValidation = z.object({
  body: z.object({
    class_name: z
      .string({
        invalid_type_error: 'class name must be string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
      })
      .optional(),
    facility: z
      .string({
        invalid_type_error: 'facility must be string',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
      })
      .refine(value => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
      })
      .optional(),
    level: z
      .string({
        invalid_type_error: 'level must be string',
      })
      .optional(),
    capacity: z
      .number({
        invalid_type_error: 'capacity must be number',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'price must be number',
      })
      .optional(),
    schedules: z
      .array(
        z.object({
          day: z.string({
            invalid_type_error: 'day must be string',
          }),
          active: z.boolean({
            invalid_type_error: 'active must be boolean',
          }),
          start_time: z
            .string({
              invalid_type_error: 'start time must be string',
            })
            .date()
            .optional(),
          end_time: z
            .string({
              invalid_type_error: 'end time must be string',
            })
            .date()
            .optional(),
        }),
        {
          invalid_type_error: 'schedules are must be an array of objects',
        },
      )
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const classScheduleValidations = {
  createValidation,
  updateValidation,
};