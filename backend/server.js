const express = require('express');
const app= express();
const path = require('path');
const PORT= process.env.PORT || 3000;

const connectDB = require('./config/db');
connectDB();
app.set('views', path.join(__dirname,'/views'));
app.set('view engine' ,'ejs');

app.use('/api/files',require('./routes/files')); 

app.use('/file', require('./routes/show'));


app.listen(PORT,()=>{
    console.log(`listeing on port ${PORT}`);
})    