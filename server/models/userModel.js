import mongoose from 'mongoose'
const userScheme = mongoose.Schema({
    fName: String,
    lName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    dateOfBirth: String,
    gender: String,
    phone: String,
    profileImage: String,
    country: String,
    city: String,
    cover: String,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    interests: [String],
}, {
    timestamps: true
}
)

const User = mongoose.model('User', userScheme);
export default User;