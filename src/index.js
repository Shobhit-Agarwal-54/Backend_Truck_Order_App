const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const colors=require("colors");
const morgan=require("morgan");
const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const apiRoutes=require("./routes/routes");
const connectDB=require("./config/db");

const app= express();
dotenv.config();
app.use(cors());
// enabling cors so as to send cross origin request
app.use(express.json());
// Sending and receiving json data 
app.use(morgan("dev"));
// morgan gives the log details of the API being hit

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,"public")));

const PORT=process.env.PORT||8080;;
app.use("/api",apiRoutes);

app.listen(PORT,async ()=>{
    console.log(`Server started at Port ${PORT}`.bgGreen.white);
    await connectDB();
    console.log("MongoDB connected");
    });
    

    // app.get("/exports",UserController.exportUser);
    
    
    
    // const doc1= await prodrepo.createOrder({
    //      ProductName:"Dal",
    //      ClientName:"Rajat",
    //      PriceOfProductPerKg:150,
    //      QuantityOrdered:800  
    //  });
    //  console.log(doc1);


     //    const details= await prodrepo.getOrderByProductAndClient({
     //         ProductName:"Dal",
     //         ClientName:"Rajat"
     //     });
     //     console.log("This is the oldest order",details[0]);
     //     console.log("All Orders of Rajat are ",details);
     //     console.log("Latest Order of Rajat is ",details[details.length()-1]);
     
        // const res=questions.find({});
        // console.log(res);;
        // questions.find({}, function(err, data) { console.log(err, data, data.length); })