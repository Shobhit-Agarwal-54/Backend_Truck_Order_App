var mongoose = require('mongoose');

const TruckSchema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true,
    },
    ClientName:{
        type:String,
        required:true,
    },
    TruckNumber:{
        type:String,
        required:true
    },
    WeightLoaded:{
        type:Number,
        required:true
    },

    orderId:[{
        type:String,
    }]
    
},{timestamps:true});

const Truck=mongoose.model("Truck",TruckSchema);
module.exports=Truck;
