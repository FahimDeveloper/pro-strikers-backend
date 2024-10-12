import { z } from 'zod';

const variationSchema = z.object({
  color: z.string().optional(),
  size: z.string().optional(),
  price: z.number().optional(),
  stock: z.number({
    required_error: 'Stock is required',
    invalid_type_error: 'Stock must be a number',
  }),
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
    thumbnail: z.string({
      required_error: 'Thumbnail URL is required',
      invalid_type_error: 'Thumbnail URL must be a string',
    }),
    gallery: z.array(
      z.string({
        required_error: 'Gallery images are required',
        invalid_type_error: 'Each gallery item must be a string',
      }),
    ),
    category: z.enum(
      ['bats', 'gloves', 'soccer items', 'wearables', 'helmets', 'sports bags'],
      {
        required_error: 'Category is required',
        invalid_type_error: 'Category must be a valid option',
      },
    ),
    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),
    variations: z.array(variationSchema, {
      required_error: 'At least one variation is required',
      invalid_type_error: 'Variations must be an array of valid objects',
    }),
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
          invalid_type_error: 'Category must be a valid option',
        },
      )
      .optional(),
    brand: z
      .string({
        invalid_type_error: 'Brand must be a string',
      })
      .optional(),
    variations: z
      .array(variationSchema, {
        invalid_type_error: 'Variations must be an array of valid objects',
      })
      .optional(),
  }),
});

export const ProductValidations = {
  createValidation,
  updateValidation,
};
