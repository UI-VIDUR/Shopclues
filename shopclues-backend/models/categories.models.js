const { Schema, model } = require("mongoose");
const slugify = require('slugify');

const CategoriesSchema = new Schema({
    catName: {
        type: String,
    },
    catTitle: {
        type: String,
    },
    catDescription: {
        type: String
    },
    catParent: {
        type: Schema.Types.ObjectId,
        ref: 'Categories'
    },
    catSlug: {
        type: String,
        unique:true
    }
}, {
    timestamps: true,
});


/** Middleware => Before saved in the data slug is created. */

CategoriesSchema.pre('save', async function(next){

    this.catName = this.catTitle.toLowerCase();
    
    if( ! this.hasOwnProperty('catParent')) {
        this.catParent = null;
    }

    if( ! this.catSlug ) {

        const CategoriesModel = this.model('Categories');

        let catSlug = slugify(this.catTitle, {
            replacement: '-',  
            remove: undefined, 
            lower: false,      
            strict: false, 
            trim: true
        });

        let existingCategories = await CategoriesModel.find({ catSlug: new RegExp(`^${catSlug}(-[0-9]*)?$`, 'i') });

        if (existingCategories.length > 0) {
            let highestSuffix = 0;
            existingCategories.forEach(category => {
                const regex = /-(\d+)$/;
                const match = category.catSlug.match(regex);
                if (match) {
                    const suffix = parseInt(match[1]);
                    if (suffix >= highestSuffix) {
                        highestSuffix = suffix + 1;
                    }
                }
            });
            catSlug += `-${highestSuffix}`;
        }

        this.catSlug = catSlug;
    }

    next();
});



module.exports = model('Categories', CategoriesSchema);

