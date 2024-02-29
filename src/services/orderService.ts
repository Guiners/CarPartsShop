import mongoose, { Model } from "mongoose";
import { Order } from '../entities/orderEntity';
import { Address } from '../entities/addressEntity';
import { Product } from '../entities/productEntity';
const addressDB: Model<Address>  = require('../model/Address');
const orderDB: Model<Order>  = require('../model/Order');

const createOrder = async (email: string, productsList: Product[], address: Address) => {
    try{
        // price = sum of prices from products 
        // date = new Date().toLocaleString('pl-PL')
    } catch (error) {
        throw error;
    }
}



// const ProductsList = async () => {
//     try{
        
//     } catch (error) {
//         throw error;
//     }
// }