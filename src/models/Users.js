const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true  
        },
        password:{
            type:String,
            required:true,
            min:6,
            max:64
        },
        role:{
            type:String,
            default:"user"
        }
    },
    {timestamps:true}
);

const AdminUser=mongoose.model("AdminUser",userSchema);
const OperatorUser=mongoose.model("OperatorUser",userSchema);

module.exports={
    AdminUser,
    OperatorUser
}