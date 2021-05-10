import express from 'express'

import {getUsers} from '../controllers/users.js'
import {createUser} from '../controllers/users.js'
import {getProfile} from '../controllers/users.js'
import {updateUserPosts} from '../controllers/users.js'
import {editUserPost} from '../controllers/users.js'
import {authenticateToken} from './auth.js'

const router = express.Router()


router.get('/', getUsers)
router.post('/', createUser)
router.get('/profile', authenticateToken, getProfile )
router.post('/new/posts/:id', updateUserPosts)
router.patch('/edit/posts/:id', editUserPost)

export default router