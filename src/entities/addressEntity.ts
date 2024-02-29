import { Document } from 'mongoose';

export interface Address extends Document {
    streetName: string;
    apartmentNumber: number;
    doorNumber?: number;
    postCode: string;
    city: string;
    country: string;
}