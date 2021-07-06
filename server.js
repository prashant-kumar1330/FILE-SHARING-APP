const express = require('express');
require('dotenv').config();
const app= express();
const path = require('path');
require('dotenv').config();
const PORT= process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
const connectDB = require('./config/db');
connectDB();
app.set('views', path.join(__dirname,'/views'));
app.set('view engine' ,'ejs');

app.use('/api/files',require('./routes/files')); 

app.use('/file', require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.listen(PORT,()=>{
    console.log(`listeing on port ${PORT}`);
})   
