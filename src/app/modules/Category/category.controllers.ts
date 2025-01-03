import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.services';

const getAllCategories = catchAsync(async (req, res) => {
  const { count, result } = await CategoryServices.getAllCategoriesFromDB(
    req.query,
  );
  sendResponse(res, httpStatus.OK, 'All categories', result, count);
});

const createCategory = catchAsync(async (req, res) => {
  const file = req?.file;
  const result = await CategoryServices.createCategoryIntoDB(req.body, file);
  sendResponse(
    res,
    httpStatus.CREATED,
    'Category created successfully',
    result,
  );
});

const updateCategory = catchAsync(async (req, res) => {
  const file = req?.file;
  const result = await CategoryServices.updateCategoryIntoDB(
    req.params.id,
    req.body,
    file,
  );
  sendResponse(res, httpStatus.OK, 'Category updated successfully', result);
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CategoryServices.deleteCategoryFromDB(id);
  sendResponse(res, httpStatus.OK, 'Category deleted successfully');
});

export const CategoryControllers = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
