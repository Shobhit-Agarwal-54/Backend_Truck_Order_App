const ProductOrderRepository=require("../repository/productOrder-repository");

class ProductService
{
    constructor()
    {
        this.ProdRepo=new ProductOrderRepository();
    }

    async createOrder(data)
    {
        try {
            data.Status="PENDING";
            data.TotalPrice=data.PriceOfProductPerKg*data.QuantityOrdered;
            data.BalancedQuantity=data.QuantityOrdered;
            const order=await this.ProdRepo.createOrder(data);
            return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;
        }
    }

    async deleteOrder({id})
    {
        try {
            
            const res=await this.ProdRepo.deleteOrder(id);
            return res;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;
        }
    }

    async updateOrder(reqbody)
    {
        try {
            let id=reqbody.id;
            let totalPrice;
            let Status;
            if(reqbody.PriceOfProductPerKg && reqbody.QuantityOrdered)
            {
                totalPrice=reqbody.PriceOfProductPerKg*reqbody.QuantityOrdered;
                reqbody.TotalPrice=totalPrice;
            }
            if(reqbody.BalancedQuantity!=0)
            {
                Status="PENDING";
            }
            else
            {
                Status="SUCCESS";
            }
            reqbody.Status=Status;
            
           const order= await this.ProdRepo.updateOrder(id,reqbody);
           return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;
        }
    }

    async getOldestOrderByProductAndClient(data)
    {
        try {
            const order=await this.ProdRepo.getOldestOrderByProductAndClient(data);
            return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;   
        }
    }

    async OrderByProductAndClient(data)
    {
        try {
            const order=await this.ProdRepo.OrderByProductAndClient(data);
            var i,sum=0;
            for(i=0;i<order.length;i++)
                {
                  sum=sum+ order[i].BalancedQuantity;
                }
                return sum;
        }
         catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;   
        }
    }

    async getOrderById(id)
    {
        try {
            const order= await this.ProdRepo.getOrderById(id);
            return order;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;  
        }
    }

    async getAllPendingOrders()
    {
        try {
          const orders=  await this.ProdRepo.getAllPendingOrders();
          return orders;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;  
        }
    }
    async getAllOrders()
    {
        try {
          const orders=  await this.ProdRepo.getAllOrders();
          return orders;
        } catch (error) {
            console.log(error);
            console.log("Error occured in productOrder-service");
            throw error;  
        }
    }

}
module.exports=ProductService;