const BookModel = require("../../models/bookSchema");
const TransactionModel = require("../../models/transactionSchema");
const UserModel = require("../../models/userSchema");

const booksOwnByUsers = async (req, res) => {
  const title = req.params.bookName;

  if (!title)
    return res
      .status(404)
      .json({ error: "Provide a Email /book-issues/:bookName" });

  try {
    const book = await BookModel.findOne({ title });
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    const history = await TransactionModel.find({ bookName: title }).populate(
      "userId",
      "name email phone"
    );
    const currentTransactions = history.filter(
      (transaction) => transaction.status === "issued"
    );

    res.json({
      totalUsers: history.length,
      status:
        currentTransactions.length > 0
          ? "Currently issued"
          : "Not issued at the moment",
      currentlyIssued:
        currentTransactions.length > 0
          ? currentTransactions.map((transaction) => ({
              user: transaction.userId,
              issuedDate: new Date(transaction.issueDate).toLocaleDateString(
                "en-CA"
              ),
            }))
          : null,
      pastUsers: history.map((transaction) => ({
        user: transaction.userId,
        issuedDate: new Date(transaction.issueDate).toLocaleDateString("en-CA"),
        returnDate: new Date(transaction.returnDate).toLocaleDateString(
          "en-CA"
        ),
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving the book users.",
      details: error.message,
    });
  }
};

module.exports = booksOwnByUsers;
