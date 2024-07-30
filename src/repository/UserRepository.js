const {AdminUser,OperatorUser}=require("../models/Users");

class UserRepository
{
    async createNewAdminUser(data)
    {
        try {
            const user=await AdminUser.create(data);
            return user;
        } catch (error) {
            console.log(error);
            console.log("Error occured in UserRepository");
            throw error;
        }
    }

    async createNewOperatorUser(data)
    {
        try {
            const user=await OperatorUser.create(data);
            return user;
        } catch (error) {
            console.log(error);
            console.log("Error occured in UserRepository");
            throw error;
        }
    }

    async findAdminUser(data)
    {
        try {
            const user=await AdminUser.findOne(data);
            return user;
        } catch (error) {
            console.log(error);
            console.log("Error occured in UserRepository");
            throw error;
        }
    }

    async findOperatorUser(data)
    {
        try {
            const user=await OperatorUser.findOne(data);
            return user;
        } catch (error) {
            console.log(error);
            console.log("Error occured in UserRepository");
            throw error;
        }
    }
    
}
module.exports=UserRepository;