import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityReservationServices } from './facilityReservation.services';

const createFacilityReservation = catchAsync(async (req, res) => {
  await FacilityReservationServices.createFacilityReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation create success');
});

const createFacilityReservationByUser = catchAsync(async (req, res) => {
  await FacilityReservationServices.createFacilityReservationByUserIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.CREATED, 'Reservation success');
});

const getAllFacilitiesReservation = catchAsync(async (req, res) => {
  const { count, result } =
    await FacilityReservationServices.getAllFacilitiesReservationsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Facilities reservation fetch succesfully',
    result,
    count,
  );
});

const getFacilityReservationSlots = catchAsync(async (req, res) => {
  const result =
    await FacilityReservationServices.getFacilityReservationSlotsFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Facility reservation slots fetch succesfully',
    result,
  );
});

const getSingleFacilityReservation = catchAsync(async (req, res) => {
  const result =
    await FacilityReservationServices.getSingleFacilityReservationFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Facility reservation fetch succesfully',
    result,
  );
});

const updateFacilityReservation = catchAsync(async (req, res) => {
  await FacilityReservationServices.updateFacilityReservationIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, httpStatus.OK, 'Facility reservation updated succesfully');
});

const deleteFacilityReservation = catchAsync(async (req, res) => {
  await FacilityReservationServices.deleteFacilityReservationFromDB(
    req.params.id,
  );
  sendResponse(res, httpStatus.OK, 'Facility reservation deleted succesfully');
});

export const FacilityReservationController = {
  createFacilityReservation,
  getAllFacilitiesReservation,
  getSingleFacilityReservation,
  updateFacilityReservation,
  deleteFacilityReservation,
  getFacilityReservationSlots,
  createFacilityReservationByUser,
};
