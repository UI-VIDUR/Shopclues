
const productSchema = require("../models/products.models");

const createProduct = ( req, res ) => {
    res.send("create product route.");
}

const getAllProducts = async (req, res) => {
    const data = await productSchema.find({});
    res.status(200).json({
        message:'All products.',
        status: true,
        statusCode:200,
        data: data
    });
}

module.exports = {
    createProduct
}