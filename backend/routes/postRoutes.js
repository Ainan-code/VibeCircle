import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";

import { createPost, deletePost, commentOnPost, likeUnLikePost, getAllPosts } from "../controllers/postController.js";


const router = express.Router();


router.post("/create", authenticateToken, createPost);

router.get("/all", authenticateToken, getAllPosts)


router.post("/like/:id", authenticateToken, likeUnLikePost);

router.post("/comment/:id", authenticateToken, commentOnPost);

router.delete("/:id", authenticateToken, deletePost);












export default router;