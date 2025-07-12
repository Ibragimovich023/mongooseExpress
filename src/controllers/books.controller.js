import Book from '../models/book.model.js'

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

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getBookById = async (req, res) => {
  try {
    const id = req.params.id
    const book = await Book.findById(id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateBook = async (req, res) => {
  try {
    const id = req.params.id
    const updated = await Book.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Book not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id
    const deleted = await Book.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Book not found' })
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
