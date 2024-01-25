import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import {
    commentOnPost, createPost, getPost, likePost, getPosts,
    getPostsByUserId, getPostsForFeed,getPostsOfCurrentUser,
    deletePost, getPostId,getPostForFeed,updatePost, replyToComment,
    editComment,
    deleteComment
} from "../controllers/post.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.delete("/delete-post/:postId", verifyUser, deletePost);
router.put("/like/:postId", verifyUser, likePost);
router.put("/update/:postId", verifyUser, updatePost);
router.get("/user-posts", verifyUser, getPostsOfCurrentUser);
router.get("/user-posts/:id", getPostsByUserId);
router.get("/feed-posts", verifyUser, getPostsForFeed);
router.get("/feed-post/:id", verifyUser, getPostForFeed);
router.post("/comment/:postId", verifyUser, commentOnPost);
router.get("/post", verifyUser, getPosts);
router.put("/reply-comment/:postId/edit/:commentId", verifyUser, replyToComment);
router.put("/comment/:postId/edit/:commentId", verifyUser, editComment);
router.delete("/comment/:postId/edit/:commentId", verifyUser, deleteComment);
router.get("/post/:postId", verifyUser, getPost);
router.get("/post-id/:postId", verifyUser, getPostId);

export default router;