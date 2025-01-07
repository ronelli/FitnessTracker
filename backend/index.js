import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
// const cors = require('cors');
// const connectDB = require('./config/db');
import connectDB from './config/db.js';
// require('dotenv').config();

import userRoutes from './routes/routes.js';
import cookieParser from 'cookie-parser';


const app = express();
// var cors = require('cors');
app.use((req, res, next) => {
    // console.log('Request Headers:', req.headers); // Log all headers
    next();
  });
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET,POST',
    credentials:true
}));
app.use(express.json());
const PORT = process.env.PORT || 5000;

//connect DB
connectDB();

// app.use(cors());
app.use(express.json());

app.use('/api',userRoutes);

app.get('/',(req,res) => {
    res.send('Hello fro the backend');
});

app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT);
})