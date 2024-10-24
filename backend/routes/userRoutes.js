import express from "express";
import { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUser } from "../controllers/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();



router.get("/profile/:username", authenticateToken, getUserProfile);

router.get("/suggested", authenticateToken, getSuggestedUsers)

router.post("/follow/:id", authenticateToken, followUnfollowUser);

router.post("/update", authenticateToken, updateUser)





















export default router;