const router= require('express').Router();
const multer =require('multer');
const path =require('path');
const File =  require('../models/file');
const{ v4:uuid4 } = require('uuid');
const  APP_BASE_URL= "http://localhost:3000";

let storage= multer.diskStorage({
    destination: (req, file, cb) => cb(null,'uploads/'),
    filename:(req,file,cb)=>{
       const uniquename= `${Date.now()} - ${Math.round(Math.round() * 1E9)}${path.extname(file.originalname)}}`; 
       cb(null,uniquename);
    }
})

let upload =multer({
    storage,
    limit: {fileSize: 1000000*100},
 }).single('myfile');

router.post('/', (req, res)=>{
          upload(req,res, async (err)=>{

            if(! req.file){
                return res.json({error: 'All ll feilds are required.'});
            }

            if(err){
                 return res.status(500).send({error: err.message}) 
            }
          

            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size
              });
     
            const response = await file.save();
            return res.json({file:`${APP_BASE_URL}/files/${response.uuid}`});


          });
         




       // store into db
       

       //http:localhost:3000/files/esffs44sgg
      
       //send link response


    })






module.exports = router; 