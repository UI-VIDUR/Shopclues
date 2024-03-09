const { model, Schema } = require("mongoose");
const slugify = require("slugify");

const brandSchema = new Schema({
    brandTitle: {
        type: String,
        unique: true,
        required: true,
        maxLength: 40
    },
    brandName: {
        type: String,
        unique: true,
        maxLength: 40
    },
    brandDescription: {
        type: String,
        maxLength: 500,
    },
    brandImage: {
        type: String,
    },
    brandSlug: {
        type: String,
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }
}, { timestamps: true });




brandSchema.pre("save", function(next) {
    this.brandName = this.brandTitle.toLowerCase();
    if( ! this.brandSlug ) {
        let brandTitle = this.brandTitle;
        let brandSlug = slugify( brandTitle , {
            replacement: '-',  
            remove: undefined, 
            lower: true,      
            strict: false, 
            trim: true
        });

        this.brandSlug = brandSlug;
    }
    next();
});



module.exports = model("Brands", brandSchema);