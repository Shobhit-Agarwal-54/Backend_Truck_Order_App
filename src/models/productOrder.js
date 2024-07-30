var mongoose = require('mongoose');

const ProductSchema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true,
    },
    ClientName:{
        type:String,
        required:true,
    },
    PriceOfProductPerKg:{
        type:Number,
        required:true
    },
    QuantityOrdered:{
        type:Number,
        required:true
    },
    BalancedQuantity:{
        type:Number,
        
    },
    TotalPrice:{
        type:Number,
        
    },
    Status:{
        type:String,
    },
},{timestamps:true});

const Order=mongoose.model("Order",ProductSchema);
module.exports=Order;










// var Schema = mongoose.Schema;

// mongoose.model('question', new Schema({
//     content:{
//         type:String,
//         required:true,
//     },
//     userEmail:{
//         type:String
//     },
//     comments:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Comment"
//             // We will have the comments inside the comments array but
//             // in database we will have only The objectId of the comments Document
//             // so in order to get comments we will need to populate it
//         }
//     ]
// },),"Tweet");

// var questions = mongoose.model('question');
// // questions.find({}, function(err, data) { console.log(err, data, data.length); });
// module.exports=questions;