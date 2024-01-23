import mongoose from 'mongoose'
const postScheme = mongoose.Schema({
    title: String,
    description: String,
    postImage: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            comment: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            reply: [
                {
                    comment: {
                        type: String,
                        required: true
                    },
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    ],
    isEdited: Boolean,
    topics: [String],
}, {
    timestamps: true
}
)

const Post = mongoose.model('Post', postScheme);
export default Post;