import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
            res.cookie('x-auth-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            res.status(201).json({ user, token, success: true, message: "Logged In Successfully!" })
        }
        else {
            res.status(400).json({ message: "Invalid Email or Password!", success: false })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})
export const registerUser = asyncHandler(async (req, res) => {
    const { fName, lName, gender, dateOfBirth, email, phone, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const prev = await User.findOne({ email })
        if (prev) {
            res.status(400).json({ message: "User with this Email, Already Exists!", success: false })
        } else {
            const user = await User.create({
                fName,
                lName,
                dateOfBirth,
                gender,
                email,
                phone,
                profileImage:'default-user.jpg',
                userName: email.split('@')[0],
                password: hashedPassword
            })
            await user.save();
            res.status(201).json({ message: "Registered Successfully!", success: true })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
})
export const profile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ user, success: true })
    } catch (error) {
        res.status(500).json({ error, success: false })
    }
});


export const changeUserName = asyncHandler(async (req, res) => {
    try {
        const { newUserName } = req.body;

        const findByUserName = await User.findOne({ userName: newUserName });

        if (findByUserName) {
            return res.status(400).json({ message: 'Username already exists', success: false });
        }
        const user = await User.findByIdAndUpdate(req.user.id, { userName: newUserName }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.json({ message: 'Username updated successfully', user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

export const changePassword = asyncHandler(async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (!await bcrypt.compare(currentPassword, user.password)) {
            return res.status(401).json({ message: 'Invalid current password', success: false });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword }, { new: true });

        res.json({ message: 'Password updated successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

export const blockUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        await User.findByIdAndUpdate(req.user.id, { $addToSet: { blockedUsers: userId } }, { new: true });
        res.status(200).json({ message: 'User blocked successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const unblockUser = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        await User.findByIdAndUpdate(req.user.id, { $pull: { blockedUsers: userId } }, { new: true });
        res.status(200).json({ message: 'User unblocked successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const followUser = asyncHandler(async (req, res) => {
    try {
        const { targetUserId } = req.params;

        const user = await User.findById(req.user.id);
        const targetUser = await User.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (user.following.includes(targetUserId)) {
            return res.status(400).json({ message: 'Already following', success: false });
        }

        await user.updateOne({ $push: { following: targetUserId } });
        await targetUser.updateOne({ $push: { followers: req.user.id } });

        res.status(200).json({ message: 'Followed successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});


export const unfollowUser = asyncHandler(async (req, res) => {
    try {
        const { targetUserId } = req.params;

        const user = await User.findById(req.user.id);
        const targetUser = await User.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (!user.following.includes(targetUserId)) {
            return res.status(400).json({ message: 'Not following', success: false });
        }

        await user.updateOne({ $pull: { following: targetUserId } });
        await targetUser.updateOne({ $pull: { followers: req.user.id } });

        res.status(200).json({ message: 'Unfollowed successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});


export const changeCover = asyncHandler(async (req, res) => {
    try {
        const { cover } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { cover }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ message: 'Cover updated successfully', user, success: true });
    } catch (error) {

    }
});
export const changeProfileImage = asyncHandler(async (req, res) => {
    try {
        const { profileImage } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { profileImage }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ message: 'Profile Image updated successfully', user, success: true });
    } catch (error) {

    }
});
export const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ user, success: true })
    } catch (error) {
        res.status(500).json({ error, success: false })
    }
});
export const getUserByUserName = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.userName)
        const user = await User.findOne({ userName: req.params.userName })
        console.log(user)
        const currentUser = await User.findById(req.user.id);
        console.log(currentUser)
        //isFollowing
        //isBlocked

        const isFollowing = currentUser.following.includes(user._id);
        const isBlocked = currentUser.blockedUsers.includes(user._id);
        const isBlockedBy = user.blockedUsers.includes(currentUser._id);
        console.log(user, isFollowing, isBlocked, isBlockedBy)
        res.status(200).json({ user, isFollowing, isBlocked, isBlockedBy, success: true });

    } catch (error) {
        res.status(500).json({ error, success: false })
    }
});

export const changeDetails = asyncHandler(async (req, res) => {
    try {
        const { fName, lName, headline, city, country, websiteLink, phone } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { fName, lName, headline, city, country, websiteLink, phone }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ message: 'Details updated successfully', user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

export const changeInterests = asyncHandler(async (req, res) => {
    try {
        const { interests } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { interests }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ message: 'Interests updated successfully', user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const changeAbout = asyncHandler(async (req, res) => {
    try {
        const { about } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { about }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ message: 'About updated successfully', user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
})

export const suggestUsers = asyncHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);

        if (!currentUser.interests || currentUser.interests.length === 0) {
            const users = await User.find({ _id: { $ne: currentUser._id } }).select('-password').limit(5);
            return res.status(200).json({ users, success: true });
        }
        const followersIds = currentUser.followers.map(follower => follower._id);
        const users = await User.find({
            userName: { $ne: currentUser.userName },
            interests: { $in: currentUser.interests },
            _id: { $nin: followersIds }, 
        }).select('-password').limit(5);

        res.status(200).json({ users, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, success: false });
    }
});

export const searchUsers = asyncHandler(async (req, res) => {
    try {
        const { query } = req.params;
        const users = await User.find({
            $or: [
                { fName: { $regex: query, $options: 'i' } },
                { lName: { $regex: query, $options: 'i' } },
                { userName: { $regex: query, $options: 'i' } },
            ],
        }).select('-password');

        res.status(200).json({ users, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, success: false });
    }
});