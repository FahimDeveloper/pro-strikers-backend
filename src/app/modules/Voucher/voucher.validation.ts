import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    voucher_type: z.string({
      invalid_type_error: 'voucher type must be string',
      required_error: 'voucher type required',
    }),
    discount_type: z.string({
      invalid_type_error: 'discount type must be string',
      required_error: 'discount type is required',
    }),
    discount_value: z.number({
      invalid_type_error: 'discount value must be string',
      required_error: 'discount value is required',
    }),
    start_date: z.string({
      invalid_type_error: 'start date type must be string',
      required_error: 'start date is required',
    }),
    end_date: z.string({
      invalid_type_error: 'end date type must be string',
      required_error: 'end date is required',
    }),
    voucher_code: z.string({
      invalid_type_error: 'voucher code must be string',
      required_error: 'voucher code is required',
    }),
    used: z.number({
      invalid_type_error: 'used must be number',
      required_error: 'used is required',
    }),
    description: z.string({
      invalid_type_error: 'description must be string',
      required_error: 'description is required',
    }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    voucher_type: z
      .string({
        invalid_type_error: 'voucher type must be string',
      })
      .optional(),
    discount_type: z
      .string({
        invalid_type_error: 'discount type must be string',
      })
      .optional(),
    discount_value: z
      .string({
        invalid_type_error: 'discount value must be string',
      })
      .optional(),
    start_date: z
      .date({
        invalid_type_error: 'start date type must be string and date type',
      })
      .optional(),
    end_date: z
      .date({
        invalid_type_error: 'end date type must be string and date type',
      })
      .optional(),
    voucher_code: z
      .string({
        invalid_type_error: 'voucher code must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be string',
      })
      .optional(),
    used: z
      .number({
        invalid_type_error: 'used must be number',
      })
      .optional(),
  }),
});

export const VoucherValidations = {
  createValidation,
  updateValidation,
};
