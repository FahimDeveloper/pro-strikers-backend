import QueryBuilder from '../../builder/QueryBuilder';
import { IOrder } from './order.interface';
import { Order } from './order.model';
const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.create(payload);
  return result;
};

const updateOrderIntoDB = async (id: string, payload: Partial<IOrder>) => {
  const result = await Order.findByIdAndUpdate(id, payload);
  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const OrdersQuery = new QueryBuilder(Order.find(), query)
    .search(['user_email'])
    .filter()
    .paginate();
  const result = await OrdersQuery?.modelQuery;
  const count = await OrdersQuery?.countTotal();
  return { result, count };
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  deleteOrderFromDB,
};
