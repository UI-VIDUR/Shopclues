const { Schema, model } = require("mongoose");
const slugify = require('slugify');

const CategoriesSchema = new Schema({
    catName: {
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
        unique: true,
    }
}, {
    timestamps: true,
});


/** Middleware => Before saved in the data slug is created. */


CategoriesSchema.pre('save', async function (next) {

    if (this.isModified('catName')) {

        this.catSlug = slugify(this.catName, { lower: true });

        const Category = model('Categories');

        let slugExists = await Category.findOne({ catSlug: this.catSlug });

        if (slugExists) {
            let count = 1;
            let newSlug = `${this.catSlug}-${count}`;
            
            while (await Category.findOne({ catSlug: newSlug })) {
                count++;
                newSlug = `${this.catSlug}-${count}`;
            }

            this.catSlug = newSlug;
        }
    }
    next();
});


module.exports = model('Categories', CategoriesSchema);

