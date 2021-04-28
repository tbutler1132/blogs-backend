import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import userRoutes from './routes/users.js'
import loginRoutes from './routes/login.js'
import postRoutes from './routes/posts.js'

require('dotenv').config()

const app = express()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/users', userRoutes) 
app.use('/login', loginRoutes) 
app.use('/posts', postRoutes) 


const CONNECTION_URL = 'mongodb+srv://tbutler1132:1234@blog.qtfaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('Uneven Tit')
})

mongoose.set('useFindAndModify', false);