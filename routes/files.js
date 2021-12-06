const router= require('express').Router();
const multer =require('multer');
const path =require('path');
const File =  require('../models/file');
const{ v4:uuid4 } = require('uuid');


let storage= multer.diskStorage({
    destination: (req, file, cb) => cb(null,'uploads/'),
    filename:(req,file,cb)=>{
       const uniquename= `${Date.now()} - ${Math.round(Math.round() * 1E9)}${path.extname(file.originalname)}`; 
       cb(null,uniquename);
    }
})

let upload =multer({
    storage,
    limit: {fileSize: 10000},
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
            return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});


          });
         




       // store into db
       

       //http:localhost:3000/files/esffs44sgg
      
       //send link response


    })


    router.post('/send', async (req, res) => {
      const { uuid, emailTo, emailFrom, expiresIn } = req.body;
      
      if(!uuid || !emailTo || !emailFrom) {
          return res.status(422).send({ error: 'All fields are required except expiry.'});
      }
      // Get data from db 
      try {
        const file = await File.findOne({ uuid: uuid });
        // if(file.sender) {
        //   return res.status(422).send({ error: 'Email already sent once.'});
        // }
        file.sender = emailFrom;
        file.receiver = emailTo;
        const response = await file.save();
        // send mail
        const sendMail = require('../services/emailservices');
        sendMail({
          from: emailFrom,
          to: emailTo,
          subject: 'file-shared',
          text: `${emailFrom} shared a file with you.`,
          html: require('../services/emailtemplate')({
                    emailFrom, 
                    downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}` ,
                    size: parseInt(file.size/1000) + ' KB',
                    expires: '24 hours'
                })
        }).then(() => {
          return res.json({success: true});
        }).catch(err => {
          return res.status(500).json({error: 'Error in email sending.'});
        });
    } catch(err) {
      return res.status(500).send({ error: 'Something went wrong.'});
    }
    
    });
 



module.exports = router; 
