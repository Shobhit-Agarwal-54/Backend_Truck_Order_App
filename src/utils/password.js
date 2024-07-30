const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const JWT_KEY=process.env.JWT_KEY;

const hashPassword=(user)=>
    {
    const SALT=bcrypt.genSaltSync(10);
    const encryptedPassword=bcrypt.hashSync(user.password,SALT);
    return encryptedPassword;
    }

const checkPassword=(userInputPlainPassword,encryptedPassword)=>
    {
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

const createToken=(user)=>
    {
        try {   
            // JWT_KEY is a key that is unique for each token creation and is specified by us
        const result= jwt.sign(user,JWT_KEY,
            {expiresIn:"7d"}
        );
        return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

const verifyToken=(token)=>
    {
        try {
           const response= jwt.verify(token,JWT_KEY);
        // The above line of code will give us the object which was contained inside the token
        // That is the user object which led to creation of token in the first place
           return response;
        } catch (error) {
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }

module.exports={
    hashPassword,
    checkPassword,
    createToken,
    verifyToken
}