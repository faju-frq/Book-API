import { readJSON, writeJSON } from "../utils/fileHandler.util.js";
import { v4 as uuidv4 } from "uuid";

const filePath = "./models/books.json";

export async function createBooks(req, res) {
  try {
    const userID = req.user.id;
    const { title, author, genre, publishedYear } = req.body;
    const books = await readJSON(filePath);
    const existingBook = books.find((book) => book.title === title && book.author === author);
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists",id: existingBook.id });
    }
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userID: userID,
    };
    books.push(newBook);
    await writeJSON(filePath, books);
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function getBooks(req, res) {
  try {
    const books = await readJSON(filePath);
      if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = books.slice(startIndex, endIndex);
    res.status(200).json({
      page,
      limit,
      total: books.length,
      books: paginatedBooks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
export async function searchBooksByGenre(req,res){
  try {
    const genre=req.query.genre;
    if (!genre) {
      return res.status(400).json({ message: "Genre is required" });
    }
    const books = await readJSON(filePath);
    const filteredBooks = books.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
    if (filteredBooks.length === 0) {
      return res.status(404).json({ message: "No books found for the specified genre" });
    }
    res.status(200).json({ books: filteredBooks });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
export async function getBookById(req, res) {
  try {
    const id = req.params.id;
    const books = await readJSON(filePath);
    const book = books.find((book) => book.id === id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function updateBook(req, res) {
  try {
    const id = req.params.id;
    const { title, author, genre, publishedYear } = req.body;
    const books = await readJSON(filePath);
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (books[bookIndex].userID !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only update your own books" });
    }

    if (title !== undefined) books[bookIndex].title = title;
    if (author !== undefined) books[bookIndex].author = author;
    if (genre !== undefined) books[bookIndex].genre = genre;
    if (publishedYear !== undefined)
      books[bookIndex].publishedYear = publishedYear;
    await writeJSON(filePath, books);
    res
      .status(200)
      .json({ message: "Book updated successfully", book: books[bookIndex] });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    const books = await readJSON(filePath);
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (books[bookIndex].userID !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only delete your own books" });
    }
    books.splice(bookIndex, 1);
    await writeJSON(filePath, books);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
