import express from "express";
import {
    login, registerUser, profile, getUserById, changeUserName, changePassword,
    blockUser, unblockUser, followUser, changeCover, changeProfileImage, changeDetails,
    changeInterests, changeAbout, suggestUsers,getUserByUserName, unfollowUser
} from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/verify", verifyUser, profile);
router.get("/suggestions", verifyUser, suggestUsers);
router.put("/change-user-name", verifyUser, changeUserName);
router.put("/change-password", verifyUser, changePassword);
router.put("/change-details", verifyUser, changeDetails);
router.put("/change-interests", verifyUser, changeInterests);
router.put("/change-about", verifyUser, changeAbout);
router.put("/block", verifyUser, blockUser);
router.put("/unblock", verifyUser, unblockUser);
router.put("/follow/:targetUserId", verifyUser, followUser);
router.put("/unfollow/:targetUserId", verifyUser, unfollowUser);
router.put("/change-cover", verifyUser, changeCover);
router.put("/change-profile-image", verifyUser, changeProfileImage);
router.get("/user-name/:userName", verifyUser,getUserByUserName);
router.get("/:id", getUserById);

export default router;