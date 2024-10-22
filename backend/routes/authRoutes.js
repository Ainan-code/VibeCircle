 import express from "express";
 import { signup, login, logout, getMe } from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

 const router = express.Router();

  router.get("/me", authenticateToken, getMe)
  router.post("/signup", signup)



  router.post("/login", login)


  router.post("/logout", logout)





 export default router;