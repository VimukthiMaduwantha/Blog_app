const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoryModel = new Schema(
    {
        categoryID: {
            type: Number,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        }
    }
)

const Category = mongoose.model('Catogory', CategoryModel);
module.exports = Category;