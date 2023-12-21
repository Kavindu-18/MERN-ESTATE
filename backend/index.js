import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoute from './routes/user-route.js';
import authRoute from './routes/auth-route.js';

dotenv.config();

mongoose.connect('mongodb://localhost:27017/express-mongo').then(() => {
    console.log('Connected to MongoDB')
    }).catch((error) => {
    console.log(error);
    });

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    });

app.use("/api/user",UserRoute);
app.use("/api/auth",authRoute);