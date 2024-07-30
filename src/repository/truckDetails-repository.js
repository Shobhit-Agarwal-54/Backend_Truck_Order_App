const Truck=require("../models/truckDetails");

class TruckDetailsRepository
{
    async createTruckDetails(data)
    {
        try {
            const truck=await Truck.create(data);
            return truck;
        } catch (error) {
            console.log(error);
            console.log("Error occured in truckDetails-repository");
            throw error;
        }
    }

    async updateTruckDetails(id,data)
    {
        try {
           const truck= await Truck.findByIdAndUpdate(id,data,{new:true});
           return truck;
        } catch (error) {
            console.log(error);
            console.log("Error occured in truckDetails-repository");
            throw error;
        }
    }

    async deleteTruckDetails(id)
    {
       try {
           const res= await Truck.findByIdAndDelete(id);
            return res;
       } catch (error) {
            console.log(error);
            console.log("Error occured in truckDetails-repository");
            throw error;
       }
    }

    async getTruckDetails(id)
    {
        try {
           const truck= await Truck.findById(id);
           return truck;
        } catch (error) {
            console.log(error);
            console.log("Error occured in truckDetails-repository");
            throw error;
        }
    }

    async getAllTrucks()
    {
        try {
            const trucks=await Truck.find().sort({createdAt:-1});
            return trucks;
        } catch (error) {
            console.log(error);
            console.log("Error occured in truckDetails-repository");
            throw error;
        }
    }

    async getTruckByDate(data)
    {
        try {
            
            // var start = new Date();
            // console.log(start);
            // start.setHours(0,0,0,0);
            
            // var end = new Date();
            // end.setHours(23,59,59,999);
            var start=new Date(data.createdAt);
            start.setHours(0,0,0,0);

            var end=new Date(data.createdAt);
            end.setHours(23,59,59,999);

           const truck= await Truck.find({
                createdAt:{$gte: start, $lt: end}
            });
            return truck;
        } catch (error) {
            console.log("Error occured in truckDetails-repository");
            console.log(error);
            throw error;
        } 
    }
}

module.exports=TruckDetailsRepository;