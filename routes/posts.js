import express from 'express'
import jwt from 'jsonwebtoken'

import {getPosts} from '../controllers/posts.js'
import {createPost} from '../controllers/posts.js'

import {authenticateToken} from './auth.js'

const router = express.Router()


router.get('/', authenticateToken, getPosts)
router.post('/', createPost)



export default router