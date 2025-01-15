import QueryBuilder from '../../builder/QueryBuilder';
import { ITournamentPayment } from './tournamentPayment.interface';
import TournamentPayment from './tournamentPayment.model';

const createTournamentPaymentIntoDB = async (payload: ITournamentPayment) => {
  const result = await TournamentPayment.create(payload);
  return result;
};

const getTournamentPaymentListFromDB = async (
  query: Record<string, unknown>,
) => {
  const paymentQuery = new QueryBuilder(TournamentPayment.find(), query)
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

const getUserTournamentPaymentListFormDB = async (
  query: Record<string, unknown>,
  email: string,
) => {
  const paymentQuery = new QueryBuilder(
    TournamentPayment.find({ email: email }),
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

const updateTournamentPaymentIntoDB = async (
  id: string,
  payload: Partial<ITournamentPayment>,
) => {
  const result = await TournamentPayment.findByIdAndUpdate(id, payload);
  return result;
};

const deleteTournamentPaymentFromDB = async (id: string) => {
  const result = await TournamentPayment.findByIdAndDelete(id);
  return result;
};

export const TournamentPaymentServices = {
  createTournamentPaymentIntoDB,
  updateTournamentPaymentIntoDB,
  getTournamentPaymentListFromDB,
  getUserTournamentPaymentListFormDB,
  deleteTournamentPaymentFromDB,
};
