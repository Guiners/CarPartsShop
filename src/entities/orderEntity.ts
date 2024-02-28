import { Product } from './productEntity'
import { Address } from './addressEntity'

export interface Order {
    email: string;
    products: [Product];
    price: number;
    date: string;
    adress: Address;
}