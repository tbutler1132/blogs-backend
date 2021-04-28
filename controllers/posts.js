import Post from '../models/posts.js'


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const {content, title, tags, user_id} = req.body

    const newPost = new Post({
        content,
        title,
        tags,
        user_id
    });
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

