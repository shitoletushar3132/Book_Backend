const BookModel = require("../../models/bookSchema");

const showAllBooks = async (req, res) => {
  try {
    const data = await BookModel.find();
    res.status(200).json({ message: "All books", books: data });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving the book users.",
      details: error.message,
    });
  }
};

module.exports = showAllBooks;
