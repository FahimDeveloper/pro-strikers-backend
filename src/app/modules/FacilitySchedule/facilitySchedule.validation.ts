import mongoose from 'mongoose';
import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    facility_name: z.string({
      invalid_type_error: 'facility name must be string',
      required_error: 'facility name is required',
    }),
    sport: z.string({
      invalid_type_error: 'sport must be string',
      required_error: 'sport is required',
    }),
    facility: z.string({
      invalid_type_error: 'facility must be string',
      required_error: 'facility is required',
    }),
    facility_duration: z.number({
      invalid_type_error: 'facility duration must be number',
      required_error: 'facility duration is required',
    }),
    trainer: z.string({
      invalid_type_error: 'trainer must be string',
      required_error: 'trainer is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
    lane: z.string({
      invalid_type_error: 'lane must be string',
      required_error: 'lane is required',
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
          .optional(),
        end_time: z
          .string({
            invalid_type_error: 'end_time must be string',
          })
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
    facility_name: z
      .string({
        invalid_type_error: 'facility name must be string',
        required_error: 'facility name is required',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
        required_error: 'sport is required',
      })
      .optional(),
    facility_duration: z
      .number({
        invalid_type_error: 'facility duration must be number',
        required_error: 'facility duration is required',
      })
      .optional(),
    trainer: z
      .string({
        invalid_type_error: 'trainer must be string',
        required_error: 'trainer is required',
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
    lane: z
      .string({
        invalid_type_error: 'lane must be string',
        required_error: 'lane is required',
      })
      .optional(),
    schedules: z
      .array(
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
            .optional(),
          end_time: z
            .string({
              invalid_type_error: 'end_time must be string',
            })
            .optional(),
        }),
        {
          required_error: 'schedules are required',
          invalid_type_error: 'schedules are must be an array of objects',
        },
      )
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const facilityScheduleValidations = {
  createValidation,
  updateValidation,
};
