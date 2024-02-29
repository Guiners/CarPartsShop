import mongoose, { Model } from "mongoose";
import { Address } from '../entities/addressEntity';
const addressDB: Model<Address>  = require('../model/Address');

const getAddress = async (addressInfo: Address) => {
    try{
        const address: Address = new addressDB(addressInfo);
        return address;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAddress };