require('dotenv').config();
import express from 'express'; // Poprawiony import
import mongoose from 'mongoose';
import { connectDB } from './config/dbConnection';

const app = express();
const PORT = process.env.PORT || 3000; // Domyślny port, jeśli nie zdefiniowano w pliku .env

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/user', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/order', require('./routes/orderRoutes'));


// app.use('/home', require('./routes/homeRoutes'));

// app.use('/payment', require('./routes/paymentRoutes'));



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;
