const BookModel = require("../../models/bookSchema");
const TransactionModel = require("../../models/transactionSchema");
const UserModel = require("../../models/userSchema");

const returnBook = async (req, res) => {
  const { bookName, userEmail, returnDate } = req.body;

  if (!bookName || !userEmail || !returnDate) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await UserModel.findOne({ email: userEmail });
    const book = await BookModel.findOne({ title: bookName });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    const parsedReturnDate = new Date(returnDate);
    if (isNaN(parsedReturnDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format for returnDate." });
    }

    const existingTranscation = await TransactionModel.findOne({
      userId: user._id,
      bookName: book.title,
    });

    if (!existingTranscation) {
      return res
        .status(404)
        .json({ error: "No transaction found for this book." });
    }

    if (existingTranscation.status === "returned") {
      return res
        .status(404)
        .json({
          message: "Your book Should be Returned",
          data: existingTranscation,
        });
    }

    const rentPerDay = existingTranscation.rentPerDay;
    const issueDate = existingTranscation.issueDate;
    const rentDays = Math.ceil(
      (parsedReturnDate - issueDate) / (1000 * 60 * 60 * 24)
    );
    const totalRent = rentDays * rentPerDay;

    existingTranscation.returnDate = parsedReturnDate;
    existingTranscation.totalRent = totalRent;
    existingTranscation.status = "returned";

    const save = await existingTranscation.save();

    res.status(200).json({
      message: "Book returned successfully.",
      totalRent: `${user.name} our total rent will be ${save.totalRent}`,
      //   transaction: save.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while returing the book.",
      details: error.message,
    });
  }
};

module.exports = returnBook;
