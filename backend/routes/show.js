const router = require('express').Router();
const File= require('../models/file');
const APP_BASE_URL= "http://localhost:3000";

router.get('/:uuid',async (req, res)=>{
    try{
        const file = await File.findOne({uuid: req.params.uuid })
        if(!file){
            return res.render('download' , {error: "file not found"});
        }


        return res.render('download',{
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${APP_BASE_URL}/files/download/${file.uuid}`
        })
    }catch(err){
        return res.render('download' , {error: "something went worng"});
    }
     
});



module.exports = router;