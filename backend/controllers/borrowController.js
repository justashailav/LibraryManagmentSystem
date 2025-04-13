import { Book } from "../models/booksModel.js";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculate.js";
export const recordBorrowedBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book not found",
      });
    }
    const user = await User.findOne({ email,accountVerified:true });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (book.availability === 0) {
      return res.status(400).json({
        success: false,
        message: "Book not available",
      });
    }
    // const isAlreadyBorrowed = user.borrowedBooks.find(
    //   (b) => b.bookId.toString() === id && b.returned === false
    // );
    const isAlreadyBorrowed = user.borrowedBooks.find(
      (b) => b.bookId && b.bookId.toString() === id && b.returned === false
    );
    
    if (isAlreadyBorrowed) {
      return res.status(400).json({
        success: false,
        message: "Book already borrowed",
      });
    }
    book.quantity -= 1;
    book.availability = book.quantity > 0;
    await book.save();

    user.borrowedBooks.push({
      bookId: book._id,
      bookTitle: book.title,
      borrowedDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await user.save();
    await Borrow.create({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      book: book._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      price: book.price,
    });
    return res.status(200).json({
      success: true,
     message: "Borrowed book recorded successfully",
      borrowedBooks: user.borrowedBooks
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to record book",
    });
  }
};

export const returnBorrowedBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { email } = req.body;
    console.log("bookId:",bookId);
    console.log("email:",email);
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book not found",
      });
    }
    console.log(book)
    const user = await User.findOne({ email,accountVerified:true });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user)
    const borrowedBook = user.borrowedBooks.find(
      (b) => b.bookId && b.bookId.toString() === bookId && b.returned === false
    );
    console.log("borrowed Books:",borrowedBook)
    if(!borrowedBook){
        return res.status(400).json({
          success: false,
          message: "You have not borrowed this book",
        });
    }
    borrowedBook.returned=true;
    await user.save()
    book.quantity += 1;
    book.availability = book.quantity > 0;

    await book.save();
    const borrow=await Borrow.findOne({
        book:bookId,
        "user.email":email,
        returnDate:null
    })
    if(!borrow){
        return res.status(400).json({
          success: false,
          message: "You have not borrowed this book",
        });
    }
    borrow.returnDate=new Date();
    const fine=calculateFine(borrow.dueDate);
    borrow.fine=fine;
    await borrow.save();
    res.status(200).json({
      success:true,
      message:fine!==0?`This book has been returned successfully.The total charges,including fine  are $${book.price+fine}`:`This book has been returned successfully.The total charges are $${book.price}`
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to return book",
    });
  }
};

export const borrowBooks=async(req,res)=>{
    const{borrowedBooks}=req.user;
    res.status(200).json({
        success:true,
        borrowedBooks
    })
}

export const getBorrowedBooksForAdmin=async(req,res)=>{
    const borrowedBooks=await Borrow.find();
    res.status(200).json({
        success:true,
        borrowedBooks
    })
}
