import { Book } from "../models/booksModel.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, description, price, quantity } = req.body;
    if (!title || !author || !description || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "All fields are requirred",
      });
    }
    const book = await Book.create({
      title,
      author,
      description,
      price,
      quantity,
    });
    return res.status(200).json({
      success: true,
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to add book",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to find all books",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch book",
      });
    }
    await book.deleteOne();
    res.status(200).json({
        success:true,
        message:"Book deleted successfully"
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};
