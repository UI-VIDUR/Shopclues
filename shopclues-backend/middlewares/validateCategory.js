const { validationResult, body } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const categoryModel = require("../models/categories.models");


const validateCategoryBody = () => {

    return [
        body('catName')
            .trim()
            .escape(),

        body('catDescription')
            .trim()
            .escape(),

        body('catParent')
            .trim()
            .escape()
            .custom(async (catId) => {
                if (catId) {
                    if (isValidObjectId(catId)) {

                        let isExist = await categoryModel.findById(catId);
                        
                        if (isExist) {
                            return true;
                        }

                        throw new Error("Category is not exist.");
                    }
                    else {
                        throw new Error("Category is not valid.");
                    }
                }
            }),
    ]
}

const validateCategoryResults = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            errors: result.array()
        })
    }
    next();
}

module.exports = {
    validateCategoryBody,
    validateCategoryResults
}