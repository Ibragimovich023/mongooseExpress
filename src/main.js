import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import bookRouter from './routes/books.routes.js'

config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use('/books', bookRouter)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log('Server running on port', PORT))
  })
  .catch(err => console.error(err))
