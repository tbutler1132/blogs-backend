import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

import User from '../models/users.js'

export const getProfile = async (req, res) => {
    const username = req.user.username
    try {
        const user = await User.findOne({ username })

        res.status(200).json(user)
    } catch (error) {
        res.status(404)
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const {username, password, posts} = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(salt)
    console.log(hashedPassword)
    const newUser = new User({
        username,
        password: hashedPassword,
        posts
    });
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// export const getUser = async (req, res) => {
//     try {
//        const user = User.findById(req.params.id)

//         res.status(200).json(user)
//     } catch (error) {
//         res.status(404).json
//     }

// }

// export const updateUser = async (req, res) => {
//     try {
//        const user = await User.findById(req.params.id)

//         res.status(200).json(user)
//     } catch (error) {
//         res.status(404).json
//     }
// }

export const updateUserPosts = async (req, res) => {
    console.log(req.body)
    const posts = req.body
    const user = await User.findById(req.params.id)
    user.posts.push(posts)
    
    
    try {
        await user.save()


        res.status(200).json(user)
    } catch (error) {
        res.status(404).json
    }
}

export const editUserPost = async (req, res) => {
    console.log(req.body)

    const user = await User.findById(req.params.id)
    console.log(user)
    const post = await user.posts.find(post => post._id == req.body.id)
    console.log(post)
    const postIndex = user.posts.indexOf(post)
    console.log(postIndex)
    await user.posts.splice(postIndex, 1, req.body)
    console.log("Posts after slice", user.posts)

    try {
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json
    }

}
