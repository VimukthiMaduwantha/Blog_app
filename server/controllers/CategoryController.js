const CategoryModel = require('../models/CategoryModel');

//create category
const createCategory = async (req, res) => {
    const {
        categoryID,
        categoryName
    } = req.body;

    try {
        const categoryItem = new CategoryModel({
            categoryID: categoryID,
            categoryName: categoryName
        });

        return await categoryItem.save().then((value) => {
            return res.status(201).json({ ID: value._id, message: "Success" });
        }).catch((err) => {
            return res.status(500).json({ err })
        })
    } catch (error) {
        return res.status(400).json({ err: error.message })
    }
}

//get top categoryID
const topCategoryID = async (req, res) => {
    try {
        const result = await CategoryModel.find({}).sort({ _id: -1 }).limit(1);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to find the top category ID" });
    }
}

//get allcategory details
const getAllCategoryDetails = async (req, res) => {
    try {
        const getAllDetails = await CategoryModel.find();
        res.status(200).json(getAllDetails);
    } catch (error) {
        res.status(500).json({ err: err.message });
    }
}

//delete category  details
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    await CategoryModel.findByIdAndDelete(id).then(() => {
        res.status(200).send({ status: 'Success' });
    }).catch((err) => {
        res.status(400).send({ status: err })
    })
}

module.exports = {
    createCategory,
    topCategoryID,
    getAllCategoryDetails,
    deleteCategory
}