import mongoose from 'mongoose';
import { hashPassword } from '../services/hashService'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        require: true
    }
});


userSchema.pre('save', async function (next) { 
    const saltRounds: number = 12;
    const user = this;
    await hashPassword(user, saltRounds);
    next();
});

module.exports = mongoose.model('userModel', userSchema);