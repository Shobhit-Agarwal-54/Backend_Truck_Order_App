const UserService=require("../service/userService");
const UserSer=new UserService();

const createNewAdminUser=async(req,res)=>{
    try {
        
       const user= await UserSer.createNewAdminUser(req.body);
       return res.status(200).json({
           success:true,
           message:"Successfully created an admin user",
           data:user,
           err:{}
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin User could not be created Please check if user is already registered or all details were written correctly",
            data:{},
            err:error
        });
    }
}

const createNewOperatorUser=async(req,res)=>{
    try {
       const user= await UserSer.createNewOperatorUser(req.body);
       return res.status(200).json({
           success:true,
           message:"Successfully created an operator user",
           data:user,
           err:{}
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Operator User could not be created Please check if user is already registered or all details were written correctly",
            data:{},
            err:error
        });
    }
}

const AdminSignIn=async (req,res)=>{
    try {
        const response=await UserSer.AdminSignIn(req.body.email,req.body.password);
        // response is the JWT token
        return res.status(200).json({
            success:true,
            token:response.token,
            user:response.user,
            err:{},
            message:"Successfully signed in"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message,
            data:{},
            success:false,
            err:error.explanation,
            name:error.name
        });
    }
}

const OperatorSignIn=async (req,res)=>{
    try {
        const response=await UserSer.OperatorSignIn(req.body.email,req.body.password);
        // response is the JWT token
        return res.status(200).json({
            success:true,
            token:response.token,
            user:response.user,
            err:{},
            message:"Successfully signed in"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message,
            data:{},
            success:false,
            err:error.explanation,
            name:error.name
        });
    }
}

const updateOperatorDetails=async(req,res)=>{
    try {
       const updatedOperator=await UserSer.updateOperatorDetails(req.body);
        return res.status(200).json({
            message:"Operator details updated successfully",
            success:true,
            err:{},
            data:updatedOperator,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Operator Details could not be updated",
            success:false,
            err:error,
            data:{}
        });
    }
}

module.exports=
{
    createNewAdminUser,
    createNewOperatorUser,
    AdminSignIn,
    OperatorSignIn,
    updateOperatorDetails
}

// const deleteAdminUser=async(req,res)=>{
    //     try {
//        const user= await UserSer.deleteAdminUser(req.body);
//        return res.status(200).json({
//            success:true,
//            message:"Successfully deleted an admin user",
//            data:user,
//            err:{}
//        })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Admin User could not be deleted",
//             data:{},
//             err:error
//         });
//     }
// }

// const deleteOperatorUser=async(req,res)=>{
//     try {
//        const user= await UserSer.deleteOperatorUser(req.body);
//        return res.status(200).json({
//            success:true,
//            message:"Successfully deleted an operator user",
//            data:user,
//            err:{}
//        })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Operator User could not be deleted",
//             data:{},
//             err:error
//         });
//     }
// }
