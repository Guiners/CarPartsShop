import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    carBrand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }

});


module.exports = mongoose.model('productModel', productSchema);