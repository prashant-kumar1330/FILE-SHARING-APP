//require('dotenv').config();
const mongoose= require('mongoose');
const uri= "mongodb+srv://fileshare:1234@cluster0.gxj0r.mongodb.net/fileshare?retryWrites=true&w=majority";

const connectDB = async ()=>{
//database connection
  await mongoose.connect(uri, { useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true});
           const connection = mongoose.connection;


 console.log("dbconnected")

}

module.exports = connectDB;