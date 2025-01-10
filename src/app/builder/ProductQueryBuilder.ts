import { FilterQuery, Query } from 'mongoose';
import { IProduct, IVariation } from '../modules/Product/product.interface';

interface QueryParams {
  search?: string;
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  min_price?: string;
  max_price?: string;
  rating?: string;
  page?: string;
  limit?: string;
}

class ProductQueryBuilder<T extends IProduct> {
  public modelQuery: Query<T[], T>;
  public query: QueryParams;

  constructor(modelQuery: Query<T[], T>, query: QueryParams) {
    this.modelQuery = modelQuery.sort('-updatedAt');
    this.query = query;
  }

  // Search functionality
  search(searchableFields: any) {
    const search = this.query?.search;
    const category = this.query?.category;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field: string) =>
            ({
              category: category,
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const { brand, category, color, size, min_price, max_price, rating } =
      this.query;

    let filters: FilterQuery<T> = {};

    // Category filter (applied first if present)
    if (category) {
      filters = {
        ...filters,
        category: {
          $regex: new RegExp(category.split('-').join(' '), 'i'),
        } as FilterQuery<T>['category'],
      };
    }

    // Brand filter (narrowing down results)
    if (brand) {
      const brands = Array.isArray(brand) ? brand : brand.split(',');
      filters = {
        ...filters,
        brand: { $in: brands } as FilterQuery<T>['brand'],
      };
    }

    // Color filter (narrowing down results)
    if (color) {
      const colors = Array.isArray(color) ? color : color.split(',');
      filters = {
        ...filters,
        $and: [
          filters, // Existing filters
          {
            $or: [
              { 'color.name': { $in: colors } } as FilterQuery<T>['color'],
              {
                'variations.color.name': { $in: colors },
              } as FilterQuery<T>['variations'],
            ],
          },
        ],
      };
    }

    // Size filter (narrowing down results)
    if (size) {
      const sizes = Array.isArray(size) ? size : size.split(',');
      filters = {
        ...filters,
        $and: [
          filters, // Existing filters
          {
            $or: [
              { size: { $in: sizes } } as FilterQuery<T>['size'],
              {
                'variations.size': { $in: sizes },
              } as FilterQuery<T>['variations'],
            ],
          },
        ],
      };
    }

    // Price range filter (applied last to ensure it considers all prior filters)
    if (min_price || max_price) {
      const priceFilter: FilterQuery<T>['offer_price'] = {};
      const variationPriceFilter: FilterQuery<T>['variations.price'] = {};

      if (min_price) {
        priceFilter.$gte = Number(min_price);
        variationPriceFilter.$gte = Number(min_price);
      }

      if (max_price) {
        priceFilter.$lte = Number(max_price);
        variationPriceFilter.$lte = Number(max_price);
      }

      filters = {
        ...filters,
        $and: [
          filters, // Existing filters
          {
            $or: [
              { offer_price: priceFilter },
              { 'variations.price': variationPriceFilter },
            ],
          },
        ],
      } as FilterQuery<T>;
    }

    // Rating filter (narrowing down results further)
    if (rating) {
      filters = {
        ...filters,
        $and: [
          filters, // Existing filters
          { rating: { $gte: Number(rating) } as FilterQuery<T>['rating'] },
        ],
      };
    }

    this.modelQuery = this.modelQuery.find(filters);

    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    return total;
  }

  async getSummary(searchableFields: string[]) {
    const { search, category } = this.query; // Add other filters as needed
    const matchFilter: FilterQuery<T> = {};

    // If search is provided, create a search filter
    if (search) {
      matchFilter.$or = searchableFields.map(
        field =>
          ({
            [field]: { $regex: search, $options: 'i' },
          }) as FilterQuery<T>,
      );
    }

    // If category filter is provided, add it to the matchFilter
    if (category) {
      matchFilter.category = category as FilterQuery<T>['category']; // Adjust field name if needed
    }

    // Add other filters as needed, e.g., brand, price range, etc.

    const summary = await this.modelQuery.model.aggregate([
      { $match: matchFilter }, // Match based on provided filters
      {
        $unwind: {
          path: '$variations',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: null,
          colors: {
            $addToSet: {
              $cond: {
                if: { $ne: [{ $ifNull: ['$color', null] }, null] },
                then: { name: '$color.name', color_code: '$color.color_code' },
                else: null,
              },
            },
          },
          variation_colors: {
            $addToSet: {
              $cond: {
                if: { $ne: [{ $ifNull: ['$variations.color', null] }, null] },
                then: {
                  name: '$variations.color.name',
                  color_code: '$variations.color.color_code',
                },
                else: null,
              },
            },
          },
          sizes: {
            $addToSet: {
              $cond: {
                if: { $ne: [{ $ifNull: ['$size', null] }, null] },
                then: '$size',
                else: '$variations.size',
              },
            },
          },
          variation_sizes: {
            $addToSet: {
              $cond: {
                if: { $ne: [{ $ifNull: ['$variations.size', null] }, null] },
                then: '$variations.size',
                else: null,
              },
            },
          },
          brands: { $addToSet: '$brand' },
          main_offer_price: { $first: '$offer_price' },
          variation_prices: {
            $push: { $ifNull: ['$variations.price', null] },
          },
        },
      },
      {
        $project: {
          colors: { $setUnion: ['$colors', '$variation_colors'] },
          sizes: { $setUnion: ['$sizes', '$variation_sizes'] },
          brands: 1,
          max_price: {
            $max: [
              { $ifNull: ['$main_offer_price', -Infinity] },
              { $max: '$variation_prices' },
            ],
          },
        },
      },
      {
        $addFields: {
          sortedBrands: { $sortArray: { input: '$brands', sortBy: 1 } },
          sortedColors: { $sortArray: { input: '$colors', sortBy: 1 } },
          sortedSizes: { $sortArray: { input: '$sizes', sortBy: 1 } },
        },
      },
      {
        $project: {
          _id: 0,
          brands: '$sortedBrands',
          colors: '$sortedColors',
          sizes: '$sortedSizes',
          max_price: 1,
        },
      },
    ]);

    return summary[0];
  }
}

export default ProductQueryBuilder;
