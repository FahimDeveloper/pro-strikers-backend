import { IResetPass } from './resetPass.interface';
import { ResetPass } from './resetPass.modal';

const createResetCode = async (payload: IResetPass) => {
  const result = await ResetPass.create(payload);
  return result;
};

const verifyResetCode = async (payload: IResetPass) => {
  const result = await ResetPass.findOne(payload);
  return result;
};

export const ResetPassService = {
  createResetCode,
  verifyResetCode,
};
