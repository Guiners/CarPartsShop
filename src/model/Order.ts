import mongoose, { Schema } from 'mongoose';
import { Order } from '../entities/orderEntity';

const orderSchema = new Schema<Order>({
    email: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productModel',
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    adress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addressModel',
        required: true
    },
    realized: {
        type: Boolean,
        default: false
    }
});
// adress to moze byc string
// symulacja platnosci

//serwis do kupowania
// gotowe biblioteki z komponentami typu komponent menu, product table wsadzasz w widok
// skumac stan use effect use state 
// zmiany strony bez przeladowania
module.exports = mongoose.model<Order>('orderModel', orderSchema);
