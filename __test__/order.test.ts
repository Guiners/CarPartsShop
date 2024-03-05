import mongoose, { Model } from "mongoose";
import { Order } from '../entities/orderEntity';
import { Address } from '../entities/addressEntity';
import { Product } from '../entities/productEntity';
const OrderService = require('../services/orderService');
const orderDB: Model<Order>  = require('../model/Order');
const DATABASE_URL=`mongodb+srv://carparts:carparts@carparts.mgmpyqm.mongodb.net/?retryWrites=true&w=majority&appName=CarParts`


const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
    } catch (error) {
        console.log(error);
    }
}

beforeAll(() => {
    connectDB();
});