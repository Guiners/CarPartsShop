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
        let product: Product = await ProductDetails(id);

        const updatedProduct = await productDB.findOneAndUpdate(
            { _id: id }, {
                $set: {
                    name: productParamethers.name ? productParamethers.name : product.name,
                    price: productParamethers.price ? productParamethers.price : product.price,
                    category: productParamethers.category ? productParamethers.category : product.category,
                    carBrand: productParamethers.carBrand ? productParamethers.carBrand : product.carBrand,
                    description: productParamethers.description ? productParamethers.description : product.description,
                    availability: productParamethers.availability ? productParamethers.availability : product.availability,
                    ammount: productParamethers.ammount ? productParamethers.ammount : product.ammount
                }
            },
            { new: true }
        );

        return updatedProduct;
    
    } catch (error) {
        throw error;
    }
}

module.exports = {ProductsList, ProductDetails, addProduct, removeProduct, changeProductDetails}




    // let paramether: keyof Product;

    // for (paramether in productParamethers) {
    //     if (paramether !== 'id'){
    //         const key: keyof Product = paramether;

    //         if (productParamethers[paramether] !== undefined && typeof product[paramether] === typeof productParamethers[paramether]) {
    //         product[key] = productParamethers[paramether];
    //         }
    //     }
    // }
