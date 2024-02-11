const { model, Schema } = require("mongoose");

const brandSchema = new Schema({
    brandTitle: {
        type: String,
        unique: true,
        required: true,
        maxLength: 40
    },
    brandDescription: {
        type: String,
        maxLength: 200,
    },
    brandImage: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Auth'
    }
}, { timestamps: true });

module.exports = model("Brands", brandSchema);