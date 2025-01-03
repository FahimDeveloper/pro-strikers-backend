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
    duration: z.number({
      invalid_type_error: 'facility duration must be number',
      required_error: 'facility duration is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
    ini_price: z.number({
      invalid_type_error: 'initial price must be number',
      required_error: 'initial price is required',
    }),
    lanes: z.array(
      z.string({
        invalid_type_error: 'lane must be array of string',
        required_error: 'lane is required',
      }),
      {
        invalid_type_error: 'lane must be array of string',
        required_error: 'lane is required',
      },
    ),
    // open_area: z
    //   .object({
    //     active: z.boolean({
    //       invalid_type_error: 'active must be boolean',
    //       required_error: 'active is required',
    //     }),
    //     durations: z.number({
    //       invalid_type_error: 'durations must be number',
    //       required_error: 'durations is required',
    //     }),
    //     ini_price: z.number({
    //       invalid_type_error: 'ini_price must be number',
    //       required_error: 'ini_price is required',
    //     }),
    //     price: z.number({
    //       invalid_type_error: 'price must be number',
    //       required_error: 'price is required',
    //     }),
    //   })
    //   .optional(),
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
  }),
});

const updateValidation = z.object({
  body: z.object({
    facility_name: z
      .string({
        invalid_type_error: 'facility name must be string',
      })
      .optional(),
    sport: z
      .string({
        invalid_type_error: 'sport must be string',
      })
      .optional(),
    duration: z
      .number({
        invalid_type_error: 'facility duration must be number',
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
    ini_price: z
      .number({
        invalid_type_error: 'initial price must be number',
      })
      .optional(),
    lanes: z
      .array(
        z.string({
          invalid_type_error: 'lane must be string',
        }),
        {
          invalid_type_error: 'lane must be array of string',
        },
      )
      .optional(),
    // open_area: z
    //   .object({
    //     active: z.boolean({
    //       invalid_type_error: 'active must be boolean',
    //       required_error: 'active is required',
    //     }),
    //     durations: z.number({
    //       invalid_type_error: 'durations must be number',
    //       required_error: 'durations is required',
    //     }),
    //     ini_price: z.number({
    //       invalid_type_error: 'ini_price must be number',
    //       required_error: 'ini_price is required',
    //     }),
    //     price: z.number({
    //       invalid_type_error: 'price must be number',
    //       required_error: 'price is required',
    //     }),
    //   })
    //   .optional(),
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
            .optional(),
          end_time: z
            .string({
              invalid_type_error: 'end_time must be string',
            })
            .optional(),
        }),
        {
          invalid_type_error: 'schedules are must be an array of objects',
        },
      )
      .optional(),
  }),
});

const idValidation = z.object({
  body: z.object({
    id: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId',
    }),
  }),
});

export const facilityScheduleValidations = {
  createValidation,
  updateValidation,
  idValidation,
};
