const CategoriesModel = require("../models/categories.models");
const escapeHtml = require('escape-html');


const createNewCategory = async (req, res) => {

    try {

        let categorySaved = {
            catName: req.body.catName,
            catDescription: req.body.catDescription,
            catParent: req.body.catParent ? req.body.catParent : null
        };

        const saveObj = new CategoriesModel(categorySaved);
        const result = await saveObj.save();

        if (!result) {
            return res.status(400).json({
                error: "Category is not created.",
                status: false,
                statusCode: 400
            });
        }

        res.status(201).json({
            message: 'Category created.',
            status: true,
            statusCode: 201,
            data: {
                id: result._id,
                catName: result.catName,
                catDescription: result.catDescription,
                catSlug: result.catSlug,
                catParent: result.catParent,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            }
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
            status: false,
            statusCode: 400,
        });
    }
}


const getAllCategories = async (req, res) => {

    try {

        const data = await CategoriesModel.find({});
        const categoriesCount = await CategoriesModel.find({}).count();

        res.status(200).json({
            message: 'All categories.',
            status: true,
            statusCode: 200,
            data: {
                categories: data,
                totalCategories: categoriesCount,
            }
        });

    }
    catch (err) {
        res.status(400).json({
            error: err.message,
            status: false,
            statusCode: 400
        });
    }

}

/** Get category by cat id  */

const getCategoryById = async (req, res) => {

    let catId = req.params.hasOwnProperty("catid") ? escapeHtml(req.params.catid) : "";

    if (!catId) {
        return res.status(400).json({
            error: "Invalid category ID.",
            status: false,
            statusCode: 400
        });
    }

    try {
        const data = await CategoriesModel.findOne({ _id: catId });
        const categoriesCount = await CategoriesModel.find({}).count();
        res.status(200).json({
            message: 'Category founded.',
            status: true,
            statusCode: 200,
            data: {
                category: data,
                totalCategories: categoriesCount
            }
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message,
            status: false,
            statusCode: 400
        });
    }

}


const getProductsSpecificCategory = async ( req, res ) => {

    const catId = req.params.hasOwnProperty("catid") ? escapeHtml(req.params.catid) : "";
    
    if (!catId) {
        return res.status(400).json({
            error: "Invalid category ID.",
            status: false,
            statusCode: 400
        });
    }

    try {

        const data = await CategoriesModel.find({}).populate('');
        const categoriesCount = await CategoriesModel.find({}).count();

        res.status(200).json({
            message: 'All categories.',
            status: true,
            statusCode: 200,
            data: {
                categories: data,
                totalCategories: categoriesCount,
            }
        });

    }
    catch (err) {
        res.status(400).json({
            error: err.message,
            status: false,
            statusCode: 400
        });
    }
}


/** GET categories products */



module.exports = {
    createNewCategory,
    getAllCategories,
    getCategoryById,
    getProductsSpecificCategory
}


