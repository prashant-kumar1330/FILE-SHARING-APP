const express = require('express');
require('dotenv').config();
const app= express();
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const corsOptions = {
    origin:  process.env.ALLOWED_CLIENTS.split(',')
    // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
  }
app.use(cors(corsOptions))
app.use(express.static('public'));
const PORT= process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
const connectDB = require('./config/db');
connectDB();

// Cors 


// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }
  

app.use(express.static('public'));
app.set('views', path.join(__dirname,'/views'));
app.set('view engine' ,'ejs');

app.use('/api/files',require('./routes/files')); 

app.use('/file', require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.listen(PORT,()=>{
    console.log(`listeing on port ${PORT}`);
})   
