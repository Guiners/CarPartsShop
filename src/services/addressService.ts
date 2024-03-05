import mongoose, { Model } from "mongoose";
import { Address } from '../entities/addressEntity';
const addressDB: Model<Address>  = require('../model/Address');

const createAddress = async (addressInfo: Address) => {
    const address: Address = new addressDB(addressInfo);
    return address;
}

module.exports = { createAddress };