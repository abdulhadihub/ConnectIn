import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { commentOnPost, createPost, getPost, likePost, getPosts,
    getPostsByUserId } from "../controllers/post.js";

const router = express.Router();

router.post("/create",verifyUser, createPost);
router.put("/like/:postId", verifyUser, likePost);
router.get("/user-posts", verifyUser, getPostsByUserId);
router.post("/comment/:postId", verifyUser, commentOnPost);
router.get("/post", verifyUser, getPosts);
router.post("/reply/:commentId/comments/:postId", verifyUser, commentOnPost);
router.get("/post/:postId", verifyUser, getPost);

export default router;