const TruckService=require("../service/truckDetails-service");
const TruckServ=new TruckService();

const createTruckDetails=async(req,res)=>{
    try {
        const truck=await TruckServ.createTruckDetails(req.body);
        return res.status(201).json({
            data:truck,
            success:true,
            message:"Successfully created a new truck",
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Truck details was not created",
            err:error,
        });
    }
}

const getAllTruckDetails=async(req,res)=>{
    try {
        const trucks=await TruckServ.getAllTrucks();
        return res.status(201).json({
            truck:trucks,
            success:true,
            message:"Successfully got all truck details",
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            truck:{},
            success:false,
            message:" All Truck details was not fetched",
            err:error,
        });
    }
}

const updateTruckDetails=async(req,res)=>{
    try {
       const truck= await TruckServ.updateTruckDetails(req.body);
       return res.status(201).json({
        data:truck,
        success:true,
        message:"Successfully updated truck details",
        err:{}
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Truck details was not updated",
            err:error,
        });
    }
}

const deleteTruckDetails=async(req,res)=>{
    try {
       const truck= await TruckServ.deleteTruckDetails(req.body);
       return res.status(201).json({
        data:truck,
        success:true,
        message:"Successfully deleted truck details",
        err:{}
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Truck details was not deleted",
            err:error,
        });
    }
}

const getTruckByDate=async(req,res)=>{
    try {
       const truck= await TruckServ.getTruckByDate(req.body);
       return res.status(201).json({
        data:truck,
        success:true,
        message:`Successfully fetched truck details of ${req.body.createdAt}`,
        err:{}
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:`Truck details of ${req.body.createdAt} was not fetched`,
            err:error,
        });   
    }
}
module.exports={
    deleteTruckDetails,
    updateTruckDetails,
    createTruckDetails,
    getAllTruckDetails,
    getTruckByDate
}