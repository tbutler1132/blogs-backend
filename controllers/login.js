import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/users.js'

export const login = async (req, res) => {

    const {username, password} = req.body
    const user = await User.findOne({ username }).lean()

    console.log(user)

    if(!user){
        return res.json({ status: 'error', error: "Invalid"})
    }

    if (await bcrypt.compare(password, user.password)){

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        return res.json({status: 'alright', accessToken: accessToken, user})
    }

    // res.json({ 
    //     accessToken: accessToken,
    //     sev: user 
    // })
}
