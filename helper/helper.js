
const mongoose=require('mongoose')
const mongodb='mongodb+srv://talha:talhasaeed@cluster0.vmpka9t.mongodb.net/';
module.exports=function(){
    mongoose.Promise=global.Promise;
    mongoose.set("strictQuery",true);
    const db=mongoose.connect(mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("successfully connected to MongoDB...")
    mongoose.connection.on('error',(err)=>{
        console.log('Error: MongoDB connection Error')
    });
    return db;
}