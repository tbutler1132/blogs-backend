import mongoose from 'mongoose'

import {postSchema} from '../models/posts.js'

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {type: String, required: true},
        posts: [postSchema],
    }, 
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

export default User