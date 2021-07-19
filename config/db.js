
const mongoose= require('mongoose');
//const uri= "mongodb+srv://fileshare:1234@cluster0.gxj0r.mongodb.net/fileshare?retryWrites=true&w=majority";

const connectDB = async ()=>{
//database connection
 return await mongoose.connect(process.env.MONGO_CONNECTION_URL , { useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true});
           const connection = mongoose.connection;


 console.log("dbconnected")

}

module.exports = connectDB; 