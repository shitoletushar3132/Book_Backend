const UserModel = require("../../models/userSchema");
const BookModel = require("../../models/bookSchema");
const TransactionModel = require("../../models/transactionSchema");

const issueBook = async (req, res) => {
  const { bookName, userEmail, issueDate } = req.body;

  if (!bookName || !userEmail || !issueDate) {
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

    const existingTranscation = await TransactionModel.findOne({
      userId: user._id,
      bookName: book.title,
    });

    if (existingTranscation) {
      return res
        .status(404)
        .json({ error: "You already get a that book on rent" });
    }

    const parsedIssueDate = new Date(issueDate);
    if (isNaN(parsedIssueDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format for issueDate." });
    }

    const transaction = new TransactionModel({
      bookName,
      userId: user._id,
      issueDate: parsedIssueDate,
      rentPerDay: book.rent,
      status: "issued",
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({
      transaction: savedTransaction,
      message: `Book issued on date ${issueDate}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while issuing the book.",
      details: error.message,
    });
  }
};

module.exports = issueBook;
