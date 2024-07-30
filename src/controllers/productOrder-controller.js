const ProductService=require("../service/productOrder-service");
const ProdServ=new ProductService();

const createOrder=async(req,res)=>{
    try {
        const order=await ProdServ.createOrder(req.body);
        return res.status(201).json({
            data:order,
            success:true,
            message:"Successfully created a new order",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Order was not created",
            err:error,
        });
    }
}

const deleteOrder=async(req,res)=>{
    try {
        const order=await ProdServ.deleteOrder(req.body);
        return res.status(200).json({
            data:order,
            success:true,
            message:"Successfully deleted a order",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Order was not deleted",
            err:error,
        });
    }
}

const updateOrder=async(req,res)=>{
    try {
        const order=await ProdServ.updateOrder(req.body);
        
        return res.status(200).json({
            data:order,
            success:true,
            message:"Successfully updated a order",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Order was not updated",
            err:error,
        });
    }
}

const getOldestOrderByProductAndClient=async(req,res)=>{
    try {
        const order=await ProdServ.getOldestOrderByProductAndClient(req.body);
        return res.status(200).json({
            data:order,
            success:true,
            message:"Successfully got the oldest pending order",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Oldest Pending Order was not fetched",
            err:error,
        });
    }
}

const OrderByProductAndClient=async(req,res)=>{
    try {
        const sum=await ProdServ.OrderByProductAndClient(req.body);
        return res.status(200).json({
            message:"Total Balanced Quantity was fetched",
            TotalBalancedQuantity:sum,
            ClientName:req.body.ClientName,
            ProductName:req.body.ProductName,
            success:true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Total Balanced Quantity was not fetched",
            err:error,
        });
    }
}

const getAllOrders=async(req,res)=>
    {
    
        try {
          const orders=  await ProdServ.getAllOrders();
          return res.status(200).json({
            message:"All  Orders were fetched",
            Orders:orders,
            success:true,
            err:{}
        });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                data:{},
                success:false,
                message:"All Orders were not fetched",
                err:error,
            }); 
        }
    }

const getAllPendingOrders=async(req,res)=>
    {
    
        try {
          const orders=  await ProdServ.getAllPendingOrders();
          return res.status(200).json({
            message:"All Pending Orders were fetched",
            Orders:orders,
            success:true,
            err:{}
        });
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                data:{},
                success:false,
                message:"All Pending Orders were not fetched",
                err:error,
            }); 
        }
    }

module.exports={
    getOldestOrderByProductAndClient,
    createOrder,
    deleteOrder,
    updateOrder,
    OrderByProductAndClient,
    getAllPendingOrders,
    getAllOrders
}
