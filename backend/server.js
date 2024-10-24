import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary} from "cloudinary";

import connectMongodb from "./db/dbConnection.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.kLEWhnS4B5Zvuz8pz6_4HGmikD8
})



const app = express();
const PORT = process.env.PORT || 5000;




app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log(`server is running on port  ${PORT}`);
    connectMongodb();
})

