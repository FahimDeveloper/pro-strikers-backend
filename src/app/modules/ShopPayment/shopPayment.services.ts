import QueryBuilder from '../../builder/QueryBuilder';
import { IShopPayment } from './shopPayment.interface';
import ShopPayment from './shopPayment.model';

const createShopPaymentIntoDB = async (payload: IShopPayment) => {
  const result = await ShopPayment.create(payload);
  return result;
};

const getShopPaymentListFromDB = async (query: Record<string, unknown>) => {
  const paymentQuery = new QueryBuilder(ShopPayment.find(), query)
    .search(['email', 'transaction_id'])
    .filter()
    .monthFilter()
    .paginate();
  const result = await paymentQuery?.modelQuery;
  const count = await paymentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const getUserShopPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    ShopPayment.find({ email: email }),
    query,
  )
    .filter()
    .paginate();
  const result = await paymentQuery?.modelQuery;
  const count = await paymentQuery?.countTotal();
  return {
    count,
    result,
  };
};

const updateShopPaymentIntoDB = async (
  id: string,
  payload: Partial<IShopPayment>,
) => {
  const result = await ShopPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteShopPaymentFromDB = async (id: string) => {
  const result = await ShopPayment.findByIdAndDelete(id);
  return result;
};

export const ShopPaymentServices = {
  createShopPaymentIntoDB,
  updateShopPaymentIntoDB,
  getShopPaymentListFromDB,
  getUserShopPaymentListFormDB,
  deleteShopPaymentFromDB,
};
