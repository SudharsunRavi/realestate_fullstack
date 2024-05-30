const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const userRouter=require('./routes/userRoutes');
const authRouter=require('./routes/authRoutes');

const app = express();
mongoose.connect(process.env.MONGO_CONNECTION)
    .then(()=>{
        console.log('Database connected');
    })
    .catch((error)=>{
        console.log(error);
    });

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})