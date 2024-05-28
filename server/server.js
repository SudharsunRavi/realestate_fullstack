const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGO_CONNECTION)
    .then(()=>{
        console.log('Database connected');
    })

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})