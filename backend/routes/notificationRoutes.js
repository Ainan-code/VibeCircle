import protectRoute from "../middleware/authenticateToken.js";
import express from "express";
import { getNotifications, deleteNotifications } from "../controllers/notificationController.js";


const router = express.Router();


router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);






export default router;