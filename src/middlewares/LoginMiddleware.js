const {expressjwt:jwt}=require("express-jwt");
const dotenv=require("dotenv");
dotenv.config();
const JWT_KEY=process.env.JWT_KEY;

const userSignedIn=jwt({
    secret:JWT_KEY,
    algorithms:["HS256"]
});

module.exports= {
userSignedIn
}