import express from 'express';
import mongoose from 'mongoose';
import UserRoute from './routes/user-route.js';
import authRoute from './routes/auth-route.js';
import listingRoute from './routes/listing-route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';



dotenv.config();

mongoose.connect('mongodb://localhost:27017/express-mongo').then(() => {
    console.log('Connected to MongoDB')
    }).catch((error) => {
    console.log(error);
    });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    });

app.use("/api/user",UserRoute);// Path: backend/routes/user-route.js
app.use("/api/auth",authRoute);// Path: backend/routes/user-route.js
app.use("/api/listing",listingRoute);// Path: backend/routes/user-route.js



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    });
});