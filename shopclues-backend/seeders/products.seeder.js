require("dotenv").config();

const productData = require("../data/products.data");
const productModel = require("../models/products.models");
const {connectDB} = require("../configurations/dbconnection");

const seedBrands = async () => {

    try {

        await connectDB();
        await productModel.deleteMany({});

        if( productData.length > 0 ) {
            productData.forEach(async doc => {
                let product = new productModel(doc);
                await product.save();
            })
        }

        console.log(`Products inserted.`);
       
    }
    catch(err) {
        await productModel.deleteMany({});
        console.log(err.message);
    }   
    
}

seedBrands();