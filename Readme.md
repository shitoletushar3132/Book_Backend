Here's a customized **README.md** file for your **Book Management System** project:

````markdown
# **Book Management System API**

A RESTful API designed for managing books, users, and transactions (issuing and returning books), while also calculating total rent for each book. This system allows you to perform CRUD operations on books and users, as well as track book transactions.

## **Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)
- [License](#license)

---

## **Features**

- Add and search for books.
- Add users and manage user information.
- Issue and return books to/from users.
- Track the history of books issued by users.
- Calculate the total rent generated for each book.

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/shitoletushar3132/book-management-system.git
   ```
````

2. Navigate to the project directory:
   ```bash
   cd book-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Create a `.env` file in the root directory and define the following:
     - `MONGO_URI`: Your MongoDB connection URI.
5. Start the server:
   ```bash
   npm start
   ```

## **API Endpoints**

## Deploy link: https://book-api-03.onrender.com/api/

### **Books**

- **POST** `/add-book`  
  Add a new book to the system.

- **GET** `/show-books`
  Search All books with all Details.

- **GET** `/search`  
  Search for books by title, category, minRent to maxRent in range we can pass a query to that.

- **GET** `/book-issues/:bookName`  
  Get a list of users who have issued a specific book.

- **GET** `/total-book-rent/:bookName`  
  Calculate the total rent generated for a specific book.

### **Users**

- **get** `/show-users`  
  Shows all users present in DB.

- **POST** `/add-user`  
  Add a new user to the system.

- **GET** `/user-issues/:email`  
  Get a list of books issued to a specific user by their email.

### **Transactions**

- **POST** `/issue-book`  
  Issue a book to a user.

- **POST** `/return-book`  
  Return a book issued to a user.

#### **Note** :- All POST request should take a data in the body. more detail check the code.

## **Error Handling**

The API follows standard HTTP response codes for error handling:

- **400**: Bad Request
- **404**: Not Found
- **500**: Internal Server Error

All error messages are returned in JSON format.

## **Dependencies**

- **Express** - Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose** - Elegant MongoDB object modeling for Node.js.
- **dotenv** - Module to load environment variables from a `.env` file.
