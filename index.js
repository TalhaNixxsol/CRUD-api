const helper=require('./helper/helper');
helper();
const cors = require('cors')
const path=require('path');
const authroute=require('./route/route')
const express=require('express');
const bodyParser = require('body-parser');

const app=express();
app.use(bodyParser.json());
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'uploadsImages')));
app.use(express.json());
app.use('/',authroute);
app.listen(3000,()=>{
    console.log("working....")
})