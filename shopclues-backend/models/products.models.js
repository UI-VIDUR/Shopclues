
const { Schema, model, } = require("mongoose");

const productSchema = new Schema({

    productTitle: {
        type: String,
        required: true,
        unique: true,
    },
    productCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        default: null
    }],
    productPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    productImage: {
        type: String
    },
    productDescription: {
        type: String
    },
    productSku: {
        type: String,
        unique: true,
    },
    productStatus: {
        type: Boolean,
        default: true
    },
    productBrand: {
        type: Schema.Types.ObjectId,
        ref: 'Brands',
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
    }
}, {
    timestamps: true,
});



module.exports = model("Products", productSchema);