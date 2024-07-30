const Order=require("../models/productOrder");

class ProductOrderRepository
{
    async createOrder(data)
    {
        try {
            const order=await Order.create(data);
            return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;
        }
    }

    async deleteOrder(id)
    {
        try {
            const res=await Order.findByIdAndDelete(id);
            return res;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;
        }
    }

    async updateOrder(id,data)
    {
        try {
           const order= await Order.findByIdAndUpdate(id,data,{new:true});
           return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;
        }
    }

    async getOldestOrderByProductAndClient(data)
    {
        try {
            const order=await Order.find({
                ProductName:data.ProductName,
                ClientName:data.ClientName,
                Status:"PENDING"
            });
            return order[0];
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;   
        }
    }

    async OrderByProductAndClient(data)
    {
        try {
            const order=await Order.find({
                ProductName:data.ProductName,
                ClientName:data.ClientName,
                Status:"PENDING"
            });
            return order;
        }
         catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;   
        }
    }

    async getOrderById(id)
    {
        try {
          const order= await Order.findById(id);
            return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;  
        }
    }

    async getAllPendingOrders()
    {
        try {
          const orders=  await Order.find({
            Status:"PENDING"
          });
          return orders;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;  
        }
    }

    async getAllOrders()
    {
        try {
          const orders=  await Order.find().sort({createdAt:-1});
          return orders;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-repository");
            throw error;  
        }
    }

    
}
module.exports=ProductOrderRepository;