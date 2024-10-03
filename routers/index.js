const express = require("express");
const router = express.Router();
const addBook = require("../controllers/books/addBook.js");
const addMultiBooks = require("../controllers/books/addMultiBooks.js");
const searchBook = require("../controllers/books/searchBook.js");
const addUser = require("../controllers/users/addUsers.js");
const issueBook = require("../controllers/transcations/issueBook.js");
const returnBook = require("../controllers/transcations/returnBook.js");
const totalRentOnBook = require("../controllers/history_book_user/totalRentOnBook.js");
const UserOwnBooks = require("../controllers/history_book_user/UserOwnBooks.js");
const booksOwnByUsers = require("../controllers/history_book_user/booksOwnByUsers.js");
const showAllBooks = require("../controllers/books/showAllBooks.js");
const showAllUsers = require("../controllers/users/showAllUsers.js");

router.post("/add-book", addBook);
router.get("/show-books", showAllBooks);
router.get("/search", searchBook);

router.post("/add-user", addUser);
router.get("/show-users", showAllUsers);

router.post("/issue-book", issueBook);
router.post("/return-book", returnBook);

router.get("/book-issues/:bookName", booksOwnByUsers);
router.get("/total-book-rent/:bookName", totalRentOnBook);
router.get("/user-issues/:email", UserOwnBooks);

module.exports = router;
