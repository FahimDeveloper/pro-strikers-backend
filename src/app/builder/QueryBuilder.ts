import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery.sort('-updatedAt');
    this.query = query;
  }

  search(searchableFields: any) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field: string) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'search',
      'limit',
      'page',
      'fields',
      'month',
      'date',
    ];
    excludeFields.forEach(el => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  rangeFilter() {
    const { start_date, end_date } = this?.query;
    if (start_date && end_date) {
      this.modelQuery = this.modelQuery.find({
        $gte: start_date,
        $lte: end_date,
      });
    }
    return this;
  }

  dateFilter() {
    const { date } = this.query;
    if (date) {
      this.modelQuery = this.modelQuery.find({
        bookings: { $elemMatch: { date: date } },
      });
    }
    return this;
  }

  monthFilter() {
    const { month } = this?.query;
    if (month) {
      const date = new Date(month as string);
      const year = date.getUTCFullYear();
      const monthIndex = date.getUTCMonth() + 1;
      this.modelQuery = this.modelQuery.find({
        $expr: {
          $and: [
            { $eq: [{ $year: '$createdAt' }, year] },
            { $eq: [{ $month: '$createdAt' }, monthIndex] },
          ],
        } as FilterQuery<T>['createdAt'],
      });
    }
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  //   fields() {
  //     const fields =
  //       (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
  //     this.modelQuery = this.modelQuery.select(fields);
  //     return this;
  //   }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    return total;
  }
}

export default QueryBuilder;
