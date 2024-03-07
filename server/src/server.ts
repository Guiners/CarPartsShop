require('dotenv').config();
import express from 'express'; 
import mongoose from 'mongoose';
const cors = require('cors');
import { connectDB } from './config/dbConnection';

const app = express();
const PORT = process.env.PORT || 3000; 
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../client/build"));

app.use('/home', require('./routes/homeRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/order', require('./routes/orderRoutes'));



// app.use('/payment', require('./routes/paymentRoutes'));



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});




module.exports = app;
