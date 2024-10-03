const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    category: String,
    rent: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
