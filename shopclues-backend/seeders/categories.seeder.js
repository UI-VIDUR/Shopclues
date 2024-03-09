require("dotenv").config();

const productCategories = require("../data/category.data");
const categoryModel = require("../models/categories.models");
const {connectDB} = require("../configurations/dbconnection");

const seedCategories = async () => {

    try {

        await connectDB();
        await categoryModel.deleteMany({});

        if( productCategories.length > 0 ) {
            productCategories.forEach(async cat => {
                let saveCat = new categoryModel(cat);
                await saveCat.save();
            })
        }

        console.log(`Categories inserted.`);
       
    }
    catch(err) {
        await categoryModel.deleteMany({});
        console.log(err.message);
    }   
    
}

seedCategories();