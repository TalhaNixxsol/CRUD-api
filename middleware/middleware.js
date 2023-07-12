const jwt=require('jsonwebtoken');
const express=require('express');
const secretkey='seebiz';
const multer=require('multer');
const fs=require('fs');
exports.tokenverify=(req,res,next)=>{
    const token=req.headers['authorization'];
    if(token){
        jwt.verify(token,secretkey,(err,data)=>{
        if(data){
            req.email=data.email;
            console.log(req.email);
            console.log('user verified against token');
            next();
        }
        })
    }
    else{
        res.json({message:'token is not verified'});
        return;
    }
};
exports.productimage= multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      console.log(file);
        // let dir = "./uploadsImages/";
        // if (!fs.existsSync(dir)){
        //   await fs.mkdirSync(dir, {recursive: true}, err => {});
        // }
      cb(null,'./uploadsImages');
    },
    filename: function (req, file, cb) {
       console.log(file);
      let extenstion = file.originalname.split('.')
      let image= file.fieldname + "-" + Date.now() + "."+[extenstion[1]]
      req.image=image
      cb(null, image);
    },
  }),
});
//exports.productimage=multer({storage: storage});