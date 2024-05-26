import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityScheduleServices } from './facilitySchedule.services';

const createFacility = catchAsync(async (req, res) => {
  await FacilityScheduleServices.createFacilityIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, 'Facility created succesfully');
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityScheduleServices.getAllFacilitiesFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'Facility fetch succesfully', result);
});

const getSingleFacility = catchAsync(async (req, res) => {
  const result = await FacilityScheduleServices.getSingleFacilityFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Facility fetch succesfully', result);
});

const updateFacility = catchAsync(async (req, res) => {
  await FacilityScheduleServices.updateFacilityIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, 'Facility updated succesfully');
});

const deleteFacility = catchAsync(async (req, res) => {
  await FacilityScheduleServices.deleteFacilityFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, 'Facility deleted succesfully');
});

export const FacilitySheduleControllers = {
  createFacility,
  getAllFacilities,
  getSingleFacility,
  updateFacility,
  deleteFacility,
};
