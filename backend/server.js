import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectMongodb from "./db/dbConnection.js";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;




app.use(express.json());
app.use("/api/auth", authRoutes)

app.listen(5000, () => {
    console.log(`server is running on port  ${PORT}`);
    connectMongodb();
})

