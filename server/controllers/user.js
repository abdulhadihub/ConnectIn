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

export const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({ user, success: true })
    } catch (error) {
        res.status(500).json({ error, success: false })
    }
});
