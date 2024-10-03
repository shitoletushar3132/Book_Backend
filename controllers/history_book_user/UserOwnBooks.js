const TransactionModel = require("../../models/transactionSchema");
const UserModel = require("../../models/userSchema");

const UserOwnBooks = async (req, res) => {
  const { email } = req.params;
  const { startDate, endDate } = req.query;

  if (!email) {
    return res
      .status(404)
      .json({ error: "Provide a valid email /user-issues/:email" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    let dateFilter = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: "Invalid date format." });
      }

      if (start > end) {
        return res
          .status(400)
          .json({ error: "Start date must be before end date." });
      }

      dateFilter = { issueDate: { $gte: start, $lte: end } };
    }

    const userData = await TransactionModel.find({
      userId: user._id,
      ...dateFilter,
    });

    res.status(200).json({
      "user name": user.name,
      "Total book issues": userData.length,
      "Book List": userData.map((data) => ({
        title: data.bookName,
        status: data.status,
        issueDate: new Date(data.issueDate).toLocaleDateString("en-CA"),
        returnDate: data.returnDate
          ? new Date(data.returnDate).toLocaleDateString("en-CA")
          : "Not Return",
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while retrieving the user's books.",
      details: error.message,
    });
  }
};

module.exports = UserOwnBooks;
