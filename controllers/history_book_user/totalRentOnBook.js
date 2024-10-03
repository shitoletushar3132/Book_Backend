const BookModel = require("../../models/bookSchema");
const TransactionModel = require("../../models/transactionSchema");

const totalRentOnBook = async (req, res) => {
  const { bookName } = req.params;

  if (!bookName)
    return res
      .status(404)
      .json({ error: "Provide a Email /total-book-rent/:bookName" });

  try {
    const book = await BookModel.findOne({ title: bookName });
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    const bookData = await TransactionModel.find({ bookName });

    const totalRentGenerated = bookData.reduce((sum, transaction) => {
      if (transaction.totalRent) {
        return sum + transaction?.totalRent;
      }
      return sum + 0;
    }, 0);

    res.status(200).json({
      "Book Name": bookName,
      "Total Rent Generated": totalRentGenerated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving the book users.",
      details: error.message,
    });
  }
};

module.exports = totalRentOnBook;
