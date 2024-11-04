import express from "express";
import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary} from "cloudinary";
import cookieParser from "cookie-parser";

import connectMongodb from "./db/dbConnection.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_API_KEY ,
    api_secret: process.env.Cloudinary_API_SECRET,
})



const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();



app.use(cookieParser());
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: true })); 

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes)
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    } )
}



app.listen(PORT, () => {
    console.log(`server is running on port  ${PORT}`);
    connectMongodb();
})

