import config from '../config';

const sk_key = config.stripe_sk_key;
const stripe = require('stripe')(sk_key);

export const getOrCreateStripeCustomer = async (email: string) => {
  const existing = await stripe.customers.search({
    query: `email:'${email}'`,
  });

  if (existing.data.length > 0) {
    return existing.data[0];
  }

  return await stripe.customers.create({ email });
};
