const BookModel = require("../../models/bookSchema");

const addMultiBooks = async (req, res) => {
  try {
    // console.log(req.body);
    const { books } = req.body;

    if (!Array.isArray(books)) {
      throw new Error(
        "this is not array of books you can use /add-book method"
      );
    }

    const saves = [];

    for (const book of books) {
      const { title, category, rent } = book;

      const existingBook = await BookModel.findOne({ title });

      if (!existingBook) {
        const bookData = new BookModel({ title, category, rent });
        const save = await bookData.save();
        saves.push(save);
      }
    }

    res.status(201).json({
      data: saves,
      message: "Books add in DB",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error.message,
      message: "Error Occuring",
    });
  }
};

module.exports = addMultiBooks;
