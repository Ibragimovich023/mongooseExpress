import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number
})

const Book = mongoose.model('Book', bookSchema)

// CREATE
const createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body
    const book = new Book({ title, author, year })
    const saved = await book.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// READ ALL
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// READ ONE
const getBookById = async (req, res) => {
  try {
    const id = req.params.id
    const book = await Book.findById(id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json(book)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
const updateBook = async (req, res) => {
  try {
    const id = req.params.id
    const { title, author, year } = req.body
    const updated = await Book.findByIdAndUpdate(id, { title, author, year }, { new: true })
    if (!updated) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id
    const deleted = await Book.findByIdAndDelete(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json({ message: 'Book deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
}
