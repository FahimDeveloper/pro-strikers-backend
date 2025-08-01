import QueryBuilder from '../../builder/QueryBuilder';
import config from '../../config';
import { ICustomMembership } from './customMembership.Interface';
import { CustomMembership } from './customMembership.model';

const sk_key = config.stripe_sk_key;
const stripe = require('stripe')(sk_key);

const createCustomMembershipIntoDB = async (payload: ICustomMembership) => {
  const product = await stripe.products.create({
    name: payload.name,
    description: payload.description,
  });

  const price = await stripe.prices.create({
    unit_amount: payload.amount * 100,
    currency: 'usd',
    recurring: { interval: payload.billing_cycle },
    product: product.id,
  });

  const result = await CustomMembership.create({
    product_id: product.id,
    price_id: price.id,
    ...payload,
  });
  return result;
};

const getCustomMembershipsFromDB = async (query: Record<string, any>) => {
  const CustomMembershipQuery = new QueryBuilder(CustomMembership.find(), query)
    .search(['name'])
    .paginate();
  const result = await CustomMembershipQuery?.modelQuery;
  const count = await CustomMembershipQuery?.countTotal();
  return {
    count,
    result,
  };
};

export const CustomMembershipServices = {
  createCustomMembershipIntoDB,
  getCustomMembershipsFromDB,
};
