require("dotenv").config();

const brandData = require("../data/brands.data");
const brandModel = require("../models/brands.models");
const {connectDB} = require("../configurations/dbconnection");

const seedBrands = async () => {

    try {

        await connectDB();
        await brandModel.deleteMany({});

        if( brandData.length > 0 ) {
            brandData.forEach(async doc => {
                let brand = new brandModel(doc);
                await brand.save();
            })
        }

        console.log(`Brands inserted.`);
       
    }
    catch(err) {
        await brandModel.deleteMany({});
        console.log(err.message);
    }   
    
}

seedBrands();