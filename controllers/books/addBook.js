const BookModel = require("../../models/bookSchema");

const addBook = async (req, res) => {
  try {
    const { title, category, rent } = req.body;

    const book = await BookModel.findOne({ title });

    if (book) {
      throw new Error(`Book "${book.title}" already exists.`);
    }

    const BookData = new BookModel({ title, category, rent });
    const save = await BookData.save();

    res.status(201).json({
      data: save,
      message: "Book add in DB",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error.message,
      message: "Error Occuring",
    });
  }
};

module.exports = addBook;
