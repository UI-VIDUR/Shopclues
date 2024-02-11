require("dotenv").config();

const productCategories = require("../data/category.data");
const categoryModel = require("../models/categories.models");
const {connectDB} = require("../configurations/dbconnection");

console.log(productCategories);

const seedCategories = async () => {
    try {
        await connectDB();
        await categoryModel.deleteMany({});
        await categoryModel.insertMany(productCategories);
        console.log(`Categories inserted.`);
    }
    catch(err) {
        //await categoryModel.deleteMany({});
        console.log(err.message);
    }   
}

seedCategories();