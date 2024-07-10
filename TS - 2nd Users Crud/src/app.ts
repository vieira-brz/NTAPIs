import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes'

const app = express()
app.use(express.json())
app.use('/users', userRoutes)

mongoose.connect('mongodb://localhost:27017/test')

export default app
