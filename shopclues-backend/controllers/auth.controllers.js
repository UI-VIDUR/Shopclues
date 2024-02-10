const authModel = require("../models/auth.models");
const { secretKey } = require("../configurations/config");


const registerController = async ( req, res ) => {

    try {   

        /** Parse request body data */
        
        let formData = {
            name: {
                firstName: req.body.firstName,
                lastName : req.body.lastName
            },
            email:req.body.email,
            password: req.body.password,
            mobileNumber: req.body.mobileNumber
        }

        const createNew = new authModel(formData);
        const savedData = await createNew.save();

        res.status(201).json({
            message:'Registration success.',
            status: true,
            statusCode:201,
            data: {
                id: savedData._id,
                name: savedData.name,
                email: savedData.email,
                mobileNumber: savedData.mobileNumber,
                createdAt: savedData.createdAt,
                updatedAt: savedData.updatedAt
            }
        });
    }
    catch(err) {
        res.status(400).json({
            error: err.message,
            status:false,
            statusCode: 400
        });
    }
};

const loginController = async ( req , res ) => {

    try {

        let email = req.body.email;
        let password = req.body.password;
        const user = await authModel.findOne({ email: email });

        if( ! user ) {
            return res.status(400).json({
                error: 'Email not exist.',
                status:false,
                statusCode: 400
            });
        }
        const isPassMatch = await user.comparePassword(password);

        if( ! isPassMatch ) {
            return res.status(400).json({
                error: 'Password not match',
                status:false,
                statusCode: 400
            });
        }

        let userInfo = {
            id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.status(200).json({
            message:'Login success.',
            status: true,
            statusCode:200,
            data:userInfo,
            token: user.generateToken( secretKey, userInfo, '1h' )
        });


    }
    catch(err) {
        res.status(400).json({
            error: err.message,
            status:false,
            statusCode: 400
        });
    }
};

module.exports = {
    registerController,
    loginController
}
