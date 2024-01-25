import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';


export const getPost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate('user', '_id email profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profilePicture',
                },
            });

        if (!post) {
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }

        const formattedPost = {
            ...post.toObject(),
            isLikedByUser: post.likes.includes(req.user._id), // Assuming req.user contains authenticated user information
        };

        res.json(formattedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting post' });
    }
})

export const getPostId = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        console.log(post)
        if (!post) {
            console.log("post not found")
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }

        res.status(200).json({ post, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error getting post' });
    }
})


export const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', '_id email profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profilePicture',
                },
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const getPostsByTopic = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({ topics: req.params.topic })
            .populate('user', '_id email profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profilePicture',
                },
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const getPostsByUser = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId })
            .populate('user', '_id email profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profilePicture',
                },
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const getPostsByMyInterests = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({ topics: { $in: req.user.interests } })
            .populate('user', '_id email profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profilePicture',
                },
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, description, postImage, interests } = req.body;
        const post = new Post({
            title,
            description,
            postImage,
            interests,
            user: req?.user?.id,
        });
        await post.save();
        res.status(201).json({ message: 'Post created Successfully!', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const likePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }

        const user = req.user.id;
        const alreadyLiked = post.likes.includes(user);

        if (alreadyLiked) {
            post.likes.pull(user);
            res.json({ message: 'Post unliked', success: true });
        } else {
            post.likes.push(user);
            res.json({ message: 'Post liked', success: true });
        }
        await post.save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const commentOnPost = asyncHandler(async (req, res) => {
    try {
        const { comment } = req.body;
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }

        const newComment = {
            comment,
            user: req.user.id,
        };
        await Post.findByIdAndUpdate(post._id, { $push: { comments: newComment } }, { new: true });
        res.status(200).json({ message: 'Comment added', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const replyToComment = asyncHandler(async (req, res) => {
    try {
        const { comment } = req.body;
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }

        const commentIndex = post.comments.findIndex((c) => c._id.toString() === req.params.commentId);
        if (commentIndex === -1) {
            res.status(404).json({ message: 'Comment not found', success: false });
            return;
        }

        const newReply = {
            comment,
            user: req.user._id, // Assuming req.user contains authenticated user information
        };
        await Post.findByIdAndUpdate(post._id, { $push: { 'comments.$[elem].reply': newReply } }, { arrayFilters: [{ 'elem._id': mongoose.Types.ObjectId(req.params.commentId) }] });
        res.status(200).json({ message: 'Reply added', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})


export const getPostsByUserId = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id })
            .populate('user', '_id email profileImage fName lName userName')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profileImage fName lName userName',
                },
            })
            .populate({
                path: 'likes',
                select: '_id email profileImage fName lName userName',

            })
            .sort({ createdAt: -1 });
        res.status(200).json({ posts, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const getPostsOfCurrentUser = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id })
            .populate('user', '_id email profileImage fName lName userName')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profileImage fName lName userName',
                },
            })
            .populate({
                path: 'likes',
                select: '_id email profileImage fName lName userName',
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ posts, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const getPostsForFeed = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({ user: { $in: user.following } })
            .populate('user', '_id email profileImage fName lName userName')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profileImage fName lName userName',
                },
            })
            .populate({
                path: 'likes',
                select: '_id email profileImage fName lName userName',
            })
            .sort({ createdAt: -1 });

        const formattedPostsPromise = posts.map((post) => {
            const isLikedByUser = post.likes.some((like) => like?.userName === user?.userName);
            console.log(post.likes.some((like) => like?.userName === user?.userName))
            const isFollowing = user.following.includes(post.user._id);
            return {
                ...post.toObject(),
                isLikedByUser,
                isFollowing,
            };
        });
        const formattedPosts = await Promise.all(formattedPostsPromise);

        res.status(200).json({ posts: formattedPosts, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const getPostForFeed = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id)
            .populate('user', '_id email profileImage fName lName userName')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '_id email profileImage fName lName userName',
                },
            })
            .populate({
                path: 'likes',
                select: '_id email profileImage fName lName userName',
            });

        const isLikedByUser = post.likes.some((like) => like?.userName === user?.userName);
        const isFollowing = user.following.includes(post.user._id);
        const formattedPost = {
            ...post.toObject(),
            isLikedByUser,
            isFollowing,
        };
        res.status(200).json({ post: formattedPost, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});


export const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }
        await Post.findByIdAndDelete(req.params.postId);
        res.json({ message: 'Post deleted', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const updatePost = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: 'Post not found', success: false });
            return;
        }
        if (post?.user?.toString() !== user?._id?.toString()) {
            res.status(401).json({ message: 'Not authorized', success: false });
            return;
        }
        const { title, description, postImage, interests } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
            title,
            description,
            postImage,
            interests,
            isEdited: true,
            postUpdatedAt: Date.now(),
        }, { new: true });
        res.status(200).json({ message: 'Post updated', success: true, updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const editComment = async (req, res) => {
  try {
    const { newCommentText } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found',success:false });
    }

    const commentToUpdate = post.comments.find((comment) => comment._id.toString() ===req.params.commentId);

    if (!commentToUpdate) {
      return res.status(404).json({ message: 'Comment not found',success:false });
    }

    commentToUpdate.comment = newCommentText;

    await post.save();

    res.status(200).json({ message: 'Comment updated successfully',success:true, updatedComment: commentToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteComment = async (req, res) => {
  try {

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found',success:false });
    }

    const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === req.params.commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found',success:false });
    }

    post.comments.splice(commentIndex, 1);

    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully',success:true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
