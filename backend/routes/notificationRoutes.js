import authenticateToken from "../middleware/authenticateToken.js";
import express from "express";
import { getNotifications, deleteNotifications } from "../controllers/notificationController.js";


const router = express.Router();


router.get("/", authenticateToken, getNotifications);
router.delete("/", authenticateToken, deleteNotifications);






export default router;