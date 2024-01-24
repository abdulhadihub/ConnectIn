import express from "express";
import { login, registerUser, profile, getUserById } from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify", verifyUser, profile);
router.get("/:id", getUserById);

export default router;