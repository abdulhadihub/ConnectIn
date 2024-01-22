import express from "express";
import { login, registerUser, profile } from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify",verifyUser, profile);

export default router;