
const productSchema = require("../models/products.models");
const escapeHtml = require('escape-html');


const createProduct = (req, res) => {
    res.send("create product route.");
}

const getAllProducts = async (req, res) => {

    const queryString = req.query;

    let limit = 10;
    let page = 1;
    let search = "";

    /** Limit Query */

    if (queryString.hasOwnProperty('limit')) {
        let tempLimit = Number(escapeHtml(queryString.limit));
        if (tempLimit > 0 && tempLimit <= 10) {
            limit = tempLimit;
        }
    }


    /** Page Query */

    if (queryString.hasOwnProperty('page')) {
        let tempPage = Number(escapeHtml(queryString.page));
        if (tempPage > 0) {
            page = tempPage;
        }
    }


    /** Search  */

    if (queryString.hasOwnProperty('search')) {
        let tempSearch = escapeHtml(queryString.search);
        if (tempSearch) {
            search = tempSearch;
        }
    }

    const skip = (page - 1) * limit;

    const data = await productSchema.find({
        $or: [
            { productTitle: { $regex: new RegExp(search, 'i') } },
            { productDescription: { $regex: new RegExp(search, 'i') } },
        ]
    }).skip(skip).limit(limit);

    try {

        const totalProducts = await productSchema.find({}).count();
        const currentResultCount = data.length;
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            message: 'All products.',
            status: true,
            statusCode: 200,
            data: {
                products: data,
                totalProducts: totalProducts,
                currentResultsCount: currentResultCount,
                currentPage: page,
                totalPages: totalPages,
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


const getAllProductsByCat = async (req, res) => {

    let catId = req.params.hasOwnProperty("catid") ? escapeHtml(req.params.catid) : "";
    
    if (!catId) {
        return res.status(400).json({
            error: "Invalid category ID.",
            status: false,
            statusCode: 400
        });
    }

    const queryString = req.query;
    let limit = 1;
    let page = 1;

    /** Limit Query */

    if (queryString.hasOwnProperty('limit')) {
        let tempLimit = Number(escapeHtml(queryString.limit));
        if (tempLimit > 0 && tempLimit <= 10) {
            limit = tempLimit;
        }
    }


    /** Page Query */

    if (queryString.hasOwnProperty('page')) {
        let tempPage = Number(escapeHtml(queryString.page));
        if (tempPage > 0) {
            page = tempPage;
        }
    }


    try {

        const skip = (page - 1) * limit;
        const data = await productSchema.find({
            productCategory: catId
        }).skip(skip).limit(limit);



        const totalProducts = await productSchema.find({ productCategory: catId }).count();
        const currentResultCount = data.length;
        const totalPages = Math.ceil(totalProducts / limit);


        res.status(200).json({
            message: 'All products.',
            status: true,
            statusCode: 200,
            data: {
                products: data,
                totalProducts: totalProducts,
                currentResultsCount: currentResultCount,
                currentPage: page,
                totalPages: totalPages
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




module.exports = {
    createProduct,
    getAllProducts,
    getAllProductsByCat
}