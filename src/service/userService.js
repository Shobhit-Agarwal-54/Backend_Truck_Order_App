const UserRepository=require("../repository/UserRepository");
const {hashPassword,checkPassword,createToken,verifyToken}=require("../utils/password");

class UserService
{
    constructor()
    {
        this.UserRepo=new UserRepository();
    }
    async createNewAdminUser(data)
    {
        try {
            data.role="ADMIN";
            const {name,email,password}=data;
            if(!name || !email || !password || password.length<6)
                {
                    throw {errMessage:"Please write all the details carefully.Check if password is more than 5 characters"}
                }
           const alreadyUser= await this.UserRepo.findAdminUser({email:email});
           if(alreadyUser)
            {
                throw {errMessage:"User is already Registered as Admin"}
            }
            else
            {
              data.password=hashPassword(data);
            const user=await this.UserRepo.createNewAdminUser(data);
            return user;
            }
        } catch (error) {
            console.log(error);
            console.log("Error occured in UserService");
            throw error;
        }
    }
    
    async createNewOperatorUser(data)
    {
        try {
            data.role="OPERATOR";
            const {name,email,password}=data;
            if(!name || !email || !password || password.length<6)
                {
                    throw {errMessage:"Please write all the details carefully.Check if password is more than 5 characters"}
                }
           const alreadyUser= await this.UserRepo.findOperatorUser({email:email});
           if(alreadyUser)
            {
                throw {errMessage:"User is already Registered as Operator"}
            }
            else
            {
            data.password=hashPassword(data);
            const user=await this.UserRepo.createNewOperatorUser(data);
            return user;
            }
        } catch (error) {
            console.log(error);
            console.log("Error occured in UserService");
            throw error;
        }
    }
    async AdminSignIn(email,plainPassword){
        try {
            // step 1-> fetch the user using the email
            const user=await this.UserRepo.findAdminUser({email});
            // step 2 -> compare incoming plain password with stored encrypted password
            const passwordMatch=checkPassword(plainPassword,user.password);
            
            if(!passwordMatch)
                {
                    console.log("Password doesn't match");
                    throw {error:"Incorrect Password"};
                }
            // step-3 -> if password match then create a token and send it to the user
            const newJWT=createToken({email:user.email,id:user.id});
            return {
                token:newJWT,
                user:user
            };
            // Same class functions are also to be called using the object of the class

        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async OperatorSignIn(email,plainPassword){
        try {
            // step 1-> fetch the user using the email
            const user=await this.UserRepo.findOperatorUser({email});
            // step 2 -> compare incoming plain password with stored encrypted password
            const passwordMatch=checkPassword(plainPassword,user.password);
            
            if(!passwordMatch)
                {
                    console.log("Password doesn't match");
                    throw {error:"Incorrect Password"};
                }
            // step-3 -> if password match then create a token and send it to the user
            const newJWT=createToken({email:user.email,id:user.id});
            return {
                token:newJWT,
                user:user
            };
            // Same class functions are also to be called using the object of the class

        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }
    async updateOperatorDetails(data)
    {
        const{name,email,password}= data;
        if( password.length<6)
        {
            throw {error:"Password length is less than 6"};
        }
        else if(name=="")
        {
            throw {error:"Name not entered"}
        }
       const user= await this.UserRepo.findOperatorUser({email});
       const encryptedPassword= hashPassword({
            password:password
        });
        user.name=name;
        user.password=encryptedPassword;
        await user.save();
        return user;
    }
}

module.exports=UserService;
    // async deleteAdminUser(data)
    // {
    //     try {
            
    //         const user=await this.UserRepo.deleteUser(data);
    //         return user;
    //     } catch (error) {
    //         console.log(error);
    //         console.log("Error occured in UserService");
    //         throw error;
    //     }
    // }
    
    // async deleteOperatorUser(data)
    // {
    //     try {
           
    //         const user=await this.UserRepo.deleteUser(data);
    //         return user;
    //     } catch (error) {
    //         console.log(error);
    //         console.log("Error occured in UserService");
    //         throw error;
    //     }
    // } 