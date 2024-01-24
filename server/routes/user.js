import express from "express";
import { login, registerUser, profile,changeUserName, changePassword,
    blockUser, unblockUser, followUser,changeCover } from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify", verifyUser, profile);
router.put("/change-user-name", verifyUser, changeUserName);
router.put("/change-password", verifyUser, changePassword);
router.put("/block", verifyUser, blockUser);
router.put("/unblock", verifyUser, unblockUser);
router.put("/follow", verifyUser, followUser);
router.put("/change-cover", verifyUser, changeCover);

export default router;