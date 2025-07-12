import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import bookRouter from './routes/books.routes.js'

config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use('/books', bookRouter)

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('server running on port', PORT))
  })
  .catch(err => console.error(err))
