const { body , validationResult } = require("express-validator");
const authModel = require("../models/auth.models");

const loginValidator = (req, res, next) => {
    return [
        body('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('Email is not valid.')
        .notEmpty()
        .withMessage('Email should not be empty.')
        .custom(async (email) => {
            let isEmailExist = await authModel.findOne({ email: email });
            if( isEmailExist ) {
                return true; 
            }
            throw new Error("Email not exist.");
        }),

        body('password')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Password should not be empty.')
    ];
}

const loginValidateErrors = ( req, res, next ) => {
    const result  = validationResult(req);
    if( ! result.isEmpty() ) {
        return res.status(400).json({
            errors: result.array()
        })
    }
    next();
}

module.exports = {
    loginValidator,
    loginValidateErrors
}