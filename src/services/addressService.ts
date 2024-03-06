import mongoose, { Model } from "mongoose";
import { Address } from '../entities/addressEntity';
const addressDB: Model<Address>  = require('../model/Address');

const createAddress = async (addressInfo: Address) => {
    const address: Address = await addressDB.create(addressInfo);
    return address;
}

module.exports = { createAddress };