const BookModel = require("../../models/bookSchema");

const searchBook = async (req, res) => {
  const { query, minRent, maxRent, category } = req.query;

  const filters = {};

  if (query) {
    const terms = query.split(" ").map((term) => new RegExp(term, "i"));
    filters.title = { $in: terms };
  }

  if (minRent || maxRent) {
    filters.rent = {};
    if (minRent) filters.rent.$gte = parseFloat(minRent);
    if (maxRent) filters.rent.$lte = parseFloat(maxRent);
  }

  if (category) {
    filters.category = category;

    if (Object.keys(filters).length === 0) {
      return res.status(404).json({
        error: true,
        message:
          "At least one search query is required search will be by using. /search?query=``& category=``& minRent=``& maxRent=``",
      });
    }

    // console.log(filters);
    try {
      const books = await BookModel.find(filters).select("-updatedAt ");

      res.status(200).json({ books });
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while retrieving the book users.",
        details: error.message,
      });
    }
  }
};

module.exports = searchBook;
