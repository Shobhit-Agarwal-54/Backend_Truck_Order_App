const CsvParser=require("json2csv").Parser;
const Order=require("../models/productOrder");
const Truck=require("../models/truckDetails");

const downloadOrder=async(req,res)=>{
    try {
       const userData= await Order.find({});
       let users=[];
        userData.forEach((user)=>{
            const {id,ClientName,ProductName,PriceOfProductPerKg,QuantityOrdered,BalancedQuantity,TotalPrice,Status}=user;
            users.push( {id,ClientName,ProductName,PriceOfProductPerKg,QuantityOrdered,BalancedQuantity,TotalPrice,Status});
        });
        const csvFields=["ID","ClientName","ProductName","PriceOfProductPerKg","QuantityOrdered","BalancedQuantity","TotalPrice","Status"];
        const csvParser=new CsvParser({csvFields});
        const csvData= csvParser.parse(users);
        console.log(csvData);

        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment:ProductData.csv");
        res.status(200).end(csvData);
    } catch (error) {
        res.status(400).json({
            message:"Some error has occured",
            success:false
        });
    }
}

const downloadTruck=async(req,res)=>{
    try {
       const userData= await Truck.find({});
       let users=[];
        userData.forEach((user)=>{
            const {id,ClientName,ProductName,TruckNumber,WeightLoaded,TruckCapacity,orderId}=user;
            users.push( {id,ClientName,ProductName,TruckNumber,WeightLoaded,TruckCapacity,orderId});
        });
        const csvFields=["ID","ClientName","ProductName","TruckNumber","WeightLoaded","TruckCapacity","OrderId"];
        const csvParser=new CsvParser({csvFields});
        const csvData= csvParser.parse(users);
        console.log(csvData);

        res.setHeader("Content-Type","text/csv");
        res.setHeader("Content-Disposition","attatchment:ProductData.csv");
        res.status(200).end(csvData);
    } catch (error) {
        res.status(400).json({
            message:"Some error has occured",
            success:false
        });
    }
}

module.exports={
    downloadOrder,
    downloadTruck
};