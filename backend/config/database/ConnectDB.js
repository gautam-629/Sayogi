import mongoose from "mongoose";

async function connectDB(url){
    try {
       await mongoose.connect(url,{dbName:'Sayogi'});
       console.log("Database connected sucessfully");
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;