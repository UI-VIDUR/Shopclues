const { body , validationResult } = require('express-validator');

const validateForm = () => {

    return [
        body('firstName')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('First name should not be empty.')
            .isLength({ max:20 })
            .withMessage('First name max length is 20.'),

        body('lastName')
            .trim()
            .escape()
            .isLength({ max:20 })
            .withMessage('Last name max length is 20.')
            .optional(),

        body('email')
            .trim()
            .escape()
            .isEmail()
            .withMessage('Email is not valid.')
            .notEmpty()
            .withMessage('Email should not be empty.'),

        body('mobileNumber')
            .trim()
            .escape()
            .isMobilePhone()
            .withMessage('Mobile number is not valid.')
            .notEmpty()
            .withMessage('Mobile number should not be empty.')
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number must be 10 characters.'),

        body('password')
            .trim()
            .notEmpty()
            .escape()
            .withMessage('Password should not be empty.')
            .isLength({ min: 8 }).withMessage('Password atleast should be 8 characters.')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)
            .withMessage('Password must contain at least one alphabetic character, one numeric character, and one special character'),

        body('confirmPassword')
            .trim()
            .escape()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match.');
                }
                return true;
            })
            .notEmpty()
            .withMessage('Confirm password should not be empty.')
    ];
}

const validateErrors = ( req, res, next ) => {
    const result  = validationResult(req);
    if( ! result.isEmpty() ) {
        return res.status(400).json({
            errors: result.array()
        })
    }
    next();
}

   
module.exports = {
    validateForm,
    validateErrors
}