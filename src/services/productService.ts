import mongoose, { Model } from "mongoose";
import { Product } from '../entities/productEntity';
import { UpdateProductI } from '../entities/updateProductEntity';
const productDB: Model<Product>  = require('../model/Product');


const ProductsList = async () => {
    try{
        const products: Product[] = await productDB.find();

        if (!products){
            throw new Error(`No product found`);
        }
        
        return products;
    } catch (error) {
        throw error;
    }
}

const ProductDetails = async (id: string) => {
    try{
        const foundProduct: Product|null = await productDB.findOne({_id: id}).exec();
        
        if (!foundProduct){
            throw new Error(`Product ID ${id} not found`);
        } 

        return foundProduct;
    } catch (error) {
        throw error;
    }
}

const addProduct = async (product: Product) => {
    try{
        const newProduct: Product = await productDB.create(product);
        return newProduct;
    } catch (error) {
        throw error;
    }
}

const removeProduct = async (id: string) => {
    try{
        const product: Product = await ProductDetails(id);
        return await product.deleteOne({ _id: id });
    } catch (error) {
        throw error;
    }
}

const changeProductDetails = async (id: string, productParamethers: UpdateProductI) => {
    try{
        let product = await ProductDetails(id);
        // let paramether: keyof Product;

        // for (paramether in productParamethers) {
        //     if (paramether !== 'id'){
        //         const key: keyof Product = paramether;

        //         if (productParamethers[paramether] !== undefined && typeof product[paramether] === typeof productParamethers[paramether]) {
        //         product[key] = productParamethers[paramether];
        //         }
        //     }
        // }

        // const keys: Array<keyof UpdateProductI> = ['name', 'price', 'category', 'carBrand', 'description', 'availability'];

        // // Iterate over keys
        // for (const paramether in productParamethers) {
        //     if (Object.prototype.hasOwnProperty.call(productParamethers, paramether) && paramether !== 'id') {
        //         console.log('paramether:', paramether);
        //         const productValue: any = product[paramether]; // Explicitly specify the type as 'any'
        //         console.log('productValue:', productValue);
        //         const newValue: any = productParamethers[paramether]; // Explicitly specify the type as 'any'
        //         console.log('newValue:', newValue);
        //         if (newValue !== undefined && typeof productValue === typeof newValue) {
        //             product[paramether] = newValue;
        //         }
        //     }
        // }


        await product.save();

        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {ProductsList, ProductDetails, addProduct, removeProduct, changeProductDetails}





// string, name?: string, price?: number, category?: string, carBrand?: string, description?: string, availability?: boolean
// if (name){
//     product.name = name;
// } else if (price){
//     product.price = price;
// } else if (category){
//     product.category = category;
// } else if (carBrand){
//     product.carBrand = carBrand;
// } else if (description){
//     product.description = description;
// } else if (availability){
//     product.availability = availability;
// }
