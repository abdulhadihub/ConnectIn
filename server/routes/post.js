import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import {
    commentOnPost, createPost, getPost, likePost, getPosts,
    getPostsByUserId, getPostsForFeed,getPostsOfCurrentUser,
    deletePost, getPostId
} from "../controllers/post.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.delete("/delete-post/:postId", verifyUser, deletePost);
router.put("/like/:postId", verifyUser, likePost);
router.get("/user-posts", verifyUser, getPostsOfCurrentUser);
router.get("/user-posts/:id", getPostsByUserId);
router.get("/feed-posts", verifyUser, getPostsForFeed);
router.post("/comment/:postId", verifyUser, commentOnPost);
router.get("/post", verifyUser, getPosts);
router.post("/reply/:commentId/comments/:postId", verifyUser, commentOnPost);
router.get("/post/:postId", verifyUser, getPost);
router.get("/post-id/:postId", verifyUser, getPostId);

export default router;