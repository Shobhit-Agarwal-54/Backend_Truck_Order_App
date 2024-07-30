const TruckDetailsRepository = require("../repository/truckDetails-repository");
const ProductService = require("./productOrder-service");
const ProdService = new ProductService();

class TruckService {
  constructor() {
    this.TruckRepo = new TruckDetailsRepository();
  }

  async createTruckDetails(data) {
    try {
      let weightLoaded=data.WeightLoaded;
      var reqbody,x,i=0;
      while(weightLoaded!=0)
        {
          const order = await ProdService.getOldestOrderByProductAndClient(data);
          if (weightLoaded >= order.BalancedQuantity) 
          {
            weightLoaded=weightLoaded-order.BalancedQuantity;
            reqbody={
              id: order.id,
              BalancedQuantity: 0,
              Status:"SUCCESS"
            } 
          }
          else
          {
            x = order.BalancedQuantity - weightLoaded;
            reqbody=
            {
              id: order.id,
              BalancedQuantity: x,
              Status:"PENDING"
            }
            weightLoaded=0;
          }
          // data.orderId[i]=order.id;
          // i++;
          if (!Array.isArray(data.orderId)) 
          {
            data.orderId = [];
          }
        data.orderId.push(order.id);
        
          await ProdService.updateOrder(reqbody);
        }

        const truck = await this.TruckRepo.createTruckDetails(data);
        return truck; 
    } catch (error) {
      console.log(error);
      console.log("Error occured in truckDetails-service");
      throw error;
    }
  }

  async getAllTrucks()
  {
      try {
          const trucks=await this.TruckRepo.getAllTrucks();
          return trucks;
      } catch (error) {
          console.log("Error occured in truckDetails-service");
          throw error;
      }
  }

  async getTruckByDate(data)
    {
        try {
           const truck= await this.TruckRepo.getTruckByDate(data);
            return truck;
        } catch (error) {
            console.log("Error occured in truckDetails-service");
            console.log(error);
            throw error;
        }
    }

  async updateTruckDetails(reqbody) {
    try {
      let id = reqbody.id;
      const oldtruck = await this.getTruckDetails(id);
     var data = reqbody;
      // data contains all the details of the new truck

      // Old order and the new order are same and weight lifted is also same
      if (
        reqbody.ProductName == oldtruck.ProductName &&
        reqbody.ClientName == oldtruck.ClientName &&
        reqbody.WeightLoaded == oldtruck.WeightLoaded
      ) {
        const newtruck = await this.TruckRepo.updateTruckDetails(id, reqbody);
        return newtruck;
      }
      // Old order and the new order are same and weight lifted is different
      else if (
        reqbody.ProductName == oldtruck.ProductName &&
        reqbody.ClientName == oldtruck.ClientName
      ) {
        // Getting old order pointed out by old truck
        const OldorderId = oldtruck.orderId;
        const Oldorder = await ProdService.getOrderById(OldorderId);

        if (
          data.WeightLoaded >
          Oldorder.BalancedQuantity + oldtruck.WeightLoaded
        ) {
          const errMessage = {
            message:
              "Excess Quantity is getting dispatched so truck cannot be loaded",
            solution: `Load only ${
              Oldorder.BalancedQuantity + oldtruck.WeightLoaded
            }kgs of ${Oldorder.ProductName}`,
            success: false,
          };
          throw errMessage;
        }

        if (data.WeightLoaded > data.TruckCapacity) {
          {
            const errMessage = {
              message:
                "Quantity loaded is greater than Truck Capacity so Truck is not created",
              solution: "Load equal to Truck Capacity",
              success: false,
            };
            throw errMessage;
          }
        }

        if (
          data.WeightLoaded <=
            Oldorder.BalancedQuantity + oldtruck.WeightLoaded &&
          data.WeightLoaded <= data.TruckCapacity
        ) {
          Oldorder.BalancedQuantity = Oldorder.BalancedQuantity +oldtruck.WeightLoaded -data.WeightLoaded;
          if (Oldorder.BalancedQuantity == 0) {
            Oldorder.Status = "SUCCESS";
          } else {
            Oldorder.Status = "PENDING";
          }
          await ProdService.updateOrder(Oldorder);
          const newtruck = await this.TruckRepo.updateTruckDetails(id, data);
          return newtruck;
        }
      }
      // Old Order and New order are different
      
      else {
        // Getting the new order
        const order = await ProdService.getOldestOrderByProductAndClient(data);
        // Checking if new truck can be created
        if (data.WeightLoaded > order.BalancedQuantity) {
          const errMessage = {
            message:
              "Excess Quantity is getting dispatched so truck cannot be loaded and cannot be updated",
            solution: `Load only ${order.BalancedQuantity}kgs of ${order.ProductName}`,
            success: false,
          };
          throw errMessage;
        } else if (data.WeightLoaded > data.TruckCapacity) {
          const errMessage = {
            message:
              "Quantity loaded is greater than Truck Capacity so Truck is not created",
            solution: "Load equal to Truck Capacity",
            success: false,
          };
          throw errMessage;
        } 
        else {
          // Getting old order pointed out by old truck and updating old order
          const OldorderId = oldtruck.orderId;
          const Oldorder = await ProdService.getOrderById(OldorderId);
          Oldorder.Status = "PENDING";
          Oldorder.BalancedQuantity = Oldorder.BalancedQuantity + oldtruck.WeightLoaded;
          await ProdService.updateOrder(Oldorder);

          // Updating the new order
          const orderId = order.id;
          data.orderId = orderId;

          var x = order.BalancedQuantity - data.WeightLoaded;
          
          var orderbody = {
            id: order.id,
            BalancedQuantity: x,
          };

          if(x==0)
            {
                orderbody.Status="SUCCESS";
            }
            else
            {
                orderbody.Status="PENDING";
            }

          await ProdService.updateOrder(orderbody);
        
        // Updating the truck
        const newtruck = await this.TruckRepo.updateTruckDetails(id, data);
        return newtruck;
        }
      }
    } catch (error) {
      console.log(error);
      console.log("Error occured in truckDetails-service");
      throw error;
    }
  }

  async deleteTruckDetails({ id }) {
    try {
      const res = await this.TruckRepo.deleteTruckDetails(id);
      return res;
    } catch (error) {
      console.log(error);
      console.log("Error occured in truckDetails-service");
      throw error;
    }
  }

  async getTruckDetails(id) {
    try {
      const truck = await this.TruckRepo.getTruckDetails(id);
      return truck;
    } catch (error) {
      console.log(error);
      console.log("Error occured in truckDetails-service");
      throw error;
    }
  }
}
module.exports = TruckService;
