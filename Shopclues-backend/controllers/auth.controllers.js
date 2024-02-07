const authModel = require("../models/auth.models");


const registerController = ( req, res ) => {

    /** Parse request body values */

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
    createNew.save().then(data => {
        res.json({
            result: data
        })
    })
    .catch(error => {
        console.log(error);
    })

    
};

const loginController = ( req, res ) => {
    res.send('Hello I am login');
};

module.exports = {
    registerController,
    loginController
}