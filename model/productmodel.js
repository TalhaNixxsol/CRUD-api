const mongoose=require ('mongoose');
const productSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}); 
const productModel=mongoose.model('ikonictask',productSchema);
module.exports=productModel;