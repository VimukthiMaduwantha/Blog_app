const express = require('express')
const CategoryController = require('../controllers/CategoryController');

const CategoryRouter = express.Router();

//create
CategoryRouter.post('/addCategory', CategoryController.createCategory);

//get top categoryID
CategoryRouter.get('/getCategoryID', CategoryController.topCategoryID);

//get all category details
CategoryRouter.get("/getAllCategoryDetails", CategoryController.getAllCategoryDetails);

//delete category details
CategoryRouter.delete('/deleteCategoryDetails/:id', CategoryController.deleteCategory);


module.exports = CategoryRouter;
