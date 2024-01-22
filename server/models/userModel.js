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
}, {
    timestamps: true
}
)

const User = mongoose.model('User', userScheme);
export default User;