import mongoose from 'mongoose';
import { IAcademy } from './academy.interfaces';
import { AcademyModel } from './academy.modal';
import QueryBuilder from '../../builder/QueryBuilder';
import { generateRandomPassword } from '../../utils/generateRandomPassword';
import { Admin } from '../Admin/admin.model';
import { sendAcademyAccountConfirmationEmail } from '../../utils/email';

const createAcademyInDB = async (payload: any) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const [academy] = await AcademyModel.create(
      [
        {
          academy_title: payload.academy_title,
          academy_membership_title: payload.academy_membership_title,
          academy_membership_price: payload.academy_membership_price,
          sport: payload.sport,
          description: payload.description,
        },
      ],
      { session },
    );
    const password = generateRandomPassword();
    const [academyAdmin] = await Admin.create(
      [
        {
          ...payload.academy_admin,
          password: password,
          academy: academy._id,
        },
      ],
      { session },
    );
    academy.academy_admin = academyAdmin._id;
    await academy.save({ session });
    await sendAcademyAccountConfirmationEmail({
      email: payload.academy_admin?.email,
      password: password,
    });
    await session.commitTransaction();

    return academy;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllAcademiesFromDB = async (query: Record<string, unknown>) => {
  const academyQuery = new QueryBuilder(
    AcademyModel.find().populate('academy_admin'),
    query,
  )
    .search(['academy_title'])
    .filter()
    .paginate();
  const result = await academyQuery?.modelQuery;
  const count = await academyQuery?.countTotal();
  return { result, count };
};

const getAcademyByIdFromDB = async (id: string) => {
  const academy = await AcademyModel.findById(id);
  return academy;
};

const updateAcademyInfoInDB = async (
  id: string,
  payload: Partial<IAcademy>,
) => {
  const result = await AcademyModel.findByIdAndUpdate(id, payload);
  return result;
};

const getAcademyByAdminIdFromDB = async (adminId: string) => {
  const academy = await AcademyModel.findOne({ academy_admin: adminId });
  return academy;
};

export const AcademyService = {
  createAcademyInDB,
  updateAcademyInfoInDB,
  getAllAcademiesFromDB,
  getAcademyByIdFromDB,
  getAcademyByAdminIdFromDB,
};
