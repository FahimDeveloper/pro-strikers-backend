import { z } from 'zod';

const colorValidation = z.object({
  name: z.string({
    required_error: 'Color name is required',
    invalid_type_error: 'Color name must be a string',
  }),
  color_code: z.string({
    required_error: 'Color code is required',
    invalid_type_error: 'Color code must be a string',
  }),
});

const variationValidation = z.object({
  color: colorValidation.optional(),
  size: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
});

export const createValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string',
    }),
    short_description: z.string({
      required_error: 'Short description is required',
      invalid_type_error: 'Short description must be a string',
    }),
    details: z.string({
      required_error: 'Product details are required',
      invalid_type_error: 'Product details must be a string',
    }),
    regular_price: z.number({
      required_error: 'Regular price is required',
      invalid_type_error: 'Regular price must be a number',
    }),
    offer_price: z.number({
      required_error: 'Offer price is required',
      invalid_type_error: 'Offer price must be a number',
    }),
    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be a number',
      })
      .default(0),
    color: colorValidation,
    size: z.string({
      required_error: 'Size is required',
      invalid_type_error: 'Size must be a string',
    }),
    stock: z.number({
      required_error: 'Stock is required',
      invalid_type_error: 'Stock must be a number',
    }),
    category: z.enum(
      ['bats', 'gloves', 'soccer items', 'wearables', 'helmets', 'sports bags'],
      {
        required_error: 'Category is required',
        invalid_type_error: 'Category must be a valid enum value',
      },
    ),
    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),
    variations: z.array(variationValidation).optional(),
  }),
});

export const updateValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Product name must be a string',
      })
      .optional(),
    short_description: z
      .string({
        invalid_type_error: 'Short description must be a string',
      })
      .optional(),
    details: z
      .string({
        invalid_type_error: 'Product details must be a string',
      })
      .optional(),
    thumbnail: z
      .string({
        invalid_type_error: 'Thumbnail URL must be a string',
      })
      .optional(),
    gallery: z
      .array(
        z.string({
          invalid_type_error: 'Each gallery item must be a string',
        }),
      )
      .optional(),
    regular_price: z
      .number({
        invalid_type_error: 'Regular price must be a number',
      })
      .optional(),
    offer_price: z
      .number({
        invalid_type_error: 'Offer price must be a number',
      })
      .optional(),
    rating: z
      .number({
        invalid_type_error: 'Rating must be a number',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .optional(),
    color: colorValidation.optional(),
    size: z
      .string({
        invalid_type_error: 'Size must be a string',
      })
      .optional(),
    stock: z
      .number({
        invalid_type_error: 'Stock must be a number',
      })
      .optional(),
    category: z
      .enum(
        [
          'bats',
          'gloves',
          'soccer items',
          'wearables',
          'helmets',
          'sports bags',
        ],
        {
          invalid_type_error: 'Category must be a valid enum value',
        },
      )
      .optional(),
    brand: z
      .string({
        invalid_type_error: 'Brand must be a string',
      })
      .optional(),
    variations: z.array(variationValidation).optional(),
  }),
});

export const ProductValidations = {
  createValidation,
  updateValidation,
};
