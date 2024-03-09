const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const roundSalt = Number(process.env.ROUND_SALT);
const jwt = require('jsonwebtoken');

const authSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            maxlength: 20
        },
        lastName: {
            type: String,
            maxlength: 20
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        maxLength: 10,
        minLength: 10,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:'user'
    }
},
{ timestamps: true });

/** Method - Hash password before saving in database */

authSchema.pre('save', async function (next)  {
    try {
        const hashPassword = await bcrypt.hash(this.password, roundSalt);
        this.password = hashPassword;
        next();
    }
    catch (err) {
        next(err.message);
    }
});

/** Method - add new method for compare the password */

authSchema.methods.comparePassword = async function (hashPassword) {
    try {
        return await bcrypt.compare(hashPassword, this.password);
    }
    catch (err) {
        throw (err);
    }
}

authSchema.methods.generateToken = function (secretKey , payload , expiresIn) {
    try {
        return jwt.sign(payload, secretKey, { expiresIn });
    }
    catch (err) {
        throw err;
    }
};

/** Define  method to get the user specific data */

authSchema.statics.getUserProperty = async function (userId, propertyType) {
    
    if (!userId) {
        return null;
    }
    
    if ( userId && !propertyType) {
        const user = await this.findById(userId);
        return user;
    }

    if( userId && propertyType == 'email' ) {
        const user = await this.findById(userId);
        return user ? user.email: null; 
    } 

    return null;
};


module.exports = model(`Auth`, authSchema);