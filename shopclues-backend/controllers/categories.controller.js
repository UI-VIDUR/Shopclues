const CategoriesModel = require("../models/categories.models");

const createNewCategory = async (req, res) => {

    try {

        let categorySaved  = {
            catName: req.body.catName,
            catDescription: req.body.catDescription,
            catParent: req.body.catParent ? req.body.catParent : null
        };
    
        const saveObj = new CategoriesModel(categorySaved);        
        const result = await saveObj.save();

        if( ! result ) {
            return res.status(400).json({
                error: "Category is not created.",
                status:false,
                statusCode: 400
            });
        }

        res.status(201).json({
            message:'Category created.',
            status: true,
            statusCode:201,
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
    catch(err) {
        console.log(err);
        res.status(400).json({
            error: err.message,
            status:false,
            statusCode:400,
        });
    }
    
}

module.exports = {
    createNewCategory
}


