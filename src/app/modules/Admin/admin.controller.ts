import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB();

  sendResponse(res, httpStatus.OK, 'Admins are retrieved succesfully', result);
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, httpStatus.OK, 'Admin is retrieved succesfully', result);
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
};
