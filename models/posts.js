import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const postSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        title: String,
        tags: [String],
    }, 
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post