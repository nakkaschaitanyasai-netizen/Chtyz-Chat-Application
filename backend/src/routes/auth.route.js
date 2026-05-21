import express from "express";
import { signup,login,logout, profileUpdate,home,getProfile} from "../controllers/auth.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
import  {sendMessage,getMessages}  from "../controllers/auth.messages.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);  
router.get("/", protectedRoute, home);
router.put("/profile-update", protectedRoute,profileUpdate);
router.get("/profile-details", protectedRoute,getProfile);
router.post("/messages", protectedRoute,sendMessage);
router.get("/messages/:receiver_id", protectedRoute,getMessages);

export default router;
