require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/dbConnection';
const app = express();
const PORT = process.env.PORT;

connectDB()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
module.exports = app;