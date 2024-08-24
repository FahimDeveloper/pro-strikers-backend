import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityReservationCartServices } from './facilityReservationCart.services';

const createFacilityReservationCart = catchAsync(async (req, res) => {
  const result =
    await FacilityReservationCartServices.createFacilityReservationCartIntoDB(
      req.body,
    );
  sendResponse(
    res,
    httpStatus.CREATED,
    'Facility reservation cart created successfully',
    result,
  );
});

const getFacilityReservationCartByUserAndDate = catchAsync(async (req, res) => {
  const result =
    await FacilityReservationCartServices.getFacilityReservationCartByFaciliyAndDateFromDB(
      req.query,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Facility reservation carts fetched successfully',
    result,
  );
});

const deleteSingleFacilityReservationCart = catchAsync(async (req, res) => {
  const result =
    await FacilityReservationCartServices.deleteSingleFacilityReservationCartFromDB(
      req.params.id,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'Facility reservation cart deleted successfully',
    result,
  );
});

const deleteUserFacilityReservationCart = catchAsync(async (req, res) => {
  const result =
    await FacilityReservationCartServices.deleteUserFacilityReservationCartFromDB(
      req.params.userId,
    );
  sendResponse(
    res,
    httpStatus.OK,
    'User Facility reservation cart deleted successfully',
    result,
  );
});

export const FacilityReservationCartController = {
  getFacilityReservationCartByUserAndDate,
  createFacilityReservationCart,
  deleteSingleFacilityReservationCart,
  deleteUserFacilityReservationCart,
};
