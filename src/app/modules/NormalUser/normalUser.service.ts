import { NormalUserModel } from './normalUser.model';

const getAllNormalUsersFromDB = async () => {
  const result = await NormalUserModel.find({});
  return result;
};

const getSingleNormalUserFromDB = async (email: string) => {
  const result = await NormalUserModel.find({ email });
  return result;
};

export const NormalUserServices = {
  getAllNormalUsersFromDB,
  getSingleNormalUserFromDB,
};
