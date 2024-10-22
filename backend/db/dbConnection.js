  
  import mongoose from "mongoose";

  const connectMongodb  = async() => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_URI);
    console.log("connected to Mongodb")
  } catch (error) {
    console.error(`Error connection to mongoDB: ${error.message}`)
    process.exit(1)
  }
  }


  export default connectMongodb;