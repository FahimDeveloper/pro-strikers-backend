import mongoose from 'mongoose';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    appointment_name: z.string({
      invalid_type_error: 'appointment name must be string',
      required_error: 'appointment name is required',
    }),
    appointment_type: z.string({
      invalid_type_error: 'appointment name must be string',
      required_error: 'appointment name is required',
    }),
    sport: z.string({
      invalid_type_error: 'sport must be string',
      required_error: 'sport is required',
    }),
    appointment_duration: z.number({
      invalid_type_error: 'appointment duration must be number',
      required_error: 'appointment duration is required',
    }),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
        required_error: 'trainer is required',
      })
      .refine(value => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
      }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
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
            invalid_type_error: 'start_time must be string',
          })
          .date()
          .optional(),
        end_time: z
          .string({
            invalid_type_error: 'end_time must be string',
          })
          .date()
          .optional(),
      }),
      {
        required_error: 'schedules are required',
        invalid_type_error: 'schedules are must be an array of objects',
      },
    ),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateValidation = z.object({
  body: z.object({
    appointment_name: z
      .string({
        invalid_type_error: 'appointment name must be string',
      })
      .optional(),
    appointment_type: z
      .string({
        invalid_type_error: 'appointment type must be string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
      })
      .optional(),
    appointment_duration: z
      .number({
        invalid_type_error: 'appointment duration must be number',
        required_error: 'appointment duration is required',
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
    description: z
      .string({
        invalid_type_error: 'description must be string',
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
              invalid_type_error: 'start_time must be string',
            })
            .date()
            .optional(),
          end_time: z
            .string({
              invalid_type_error: 'end_time must be string',
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

export const appointmentScheduleValidations = {
  createValidation,
  updateValidation,
};