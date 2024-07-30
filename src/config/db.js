const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGBDB_ATLAS_URL);
        console.log("Connected to database ",mongoose.connection.host);
    } catch (error) {
        console.log(`error in connection DB ${error}`);
    }
}
module.exports=connectDB;