const express = require('express');
// const mongoose= require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const app= express();
require('dotenv').config();
const cors = require('cors');
const corsOptions = {
    origin:  process.env.ALLOWED_CLIENTS.split(',')
    // ['http://localhost:3000', 'http://localhost:5500', 'http://localhost:3300']
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
app.get('/',(req,res)=>{
  return res.send("working");
})
app.use('/api/files',require('./routes/files')); 

app.use('/files', require('./routes/show'));
app.use('/files/download',require('./routes/download'));
 
   app.listen(PORT,()=>{
      console.log(`listeing on port ${PORT}`);
  })
  //database connection
  // mongoose.connect(process.env.MONGO_CONNECTION_URL , { useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true})
  //  .then(()=>{
  
  //  }) 
  //  .catch(err=>{
  //   console.log("db not connected")
  //  })

           
  
  
   
  

  
