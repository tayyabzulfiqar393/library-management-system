# Library Management System API

This repository contains the backend API for a Library Management System built using **Node.js** and **MongoDB** with **Mongoose**. The API allows managing books, authors, and borrowers, with features such as borrowing and returning books while adhering to real-world constraints and rules.

---

## Features

1. **CRUD Operations**:
   - Manage books, authors, and borrowers.
   - Validation for inputs such as unique ISBNs and phone numbers.
2. **Borrowing and Returning Mechanism**:
   - Tracks available copies of books.
   - Enforces borrowing limits based on membership type.
3. **Business Rules**:
   - Restrict authors to a maximum of 5 books.
   - Prevent borrowers with overdue books from borrowing more.
   - Books with borrowing counts above 10 cannot have more than 100 copies.
4. **Error Handling**:
   - Friendly error messages for invalid actions, such as borrowing unavailable books or exceeding borrowing limits.

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/tayyabzulfiqar393/library-management-system.git
   cd library-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/library_db
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Seed the database with sample data:
   ```bash
   node seed.js
   ```

6. Access the API at `http://localhost:5000`.

---

## API Endpoints

### **Books**

#### 1. Add a new book
- **Endpoint**: `POST /api/books`
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "AUTHOR_ID",
    "isbn": "1234567890123",
    "availableCopies": 10
  }
  ```

#### 2. Update a book
- **Endpoint**: `PUT /api/books/:id`
- **Request Body**: Partial fields allowed.

#### 3. Delete a book
- **Endpoint**: `DELETE /api/books/:id`

### **Authors**


#### 1. Add a new author
- **Endpoint**: `POST /api/authors`
- **Request Body**:
  ```json
  {
    "name": "Author Name",
    "email": "author@example.com",
    "phoneNumber": "+923013339296"
  }
  ```

#### 2. Update an author
- **Endpoint**: `PUT /api/authors/:id`
- **Request Body**: Partial fields allowed.

#### 3. Delete an author
- **Endpoint**: `DELETE /api/authors/:id`

### **Borrowers**

#### 1. Add a new borrower
- **Endpoint**: `POST /api/borrowers`
- **Request Body**:
  ```json
  {
    "name": "Borrower Name",
    "membershipActive": true,
    "membershipType": "Standard"
  }
  ```

#### 2. Update a borrower
- **Endpoint**: `PUT /api/borrowers/:id`
- **Request Body**: Partial fields allowed.

### **Borrowing and Returning**

#### 1. Borrow a book
- **Endpoint**: `POST /api/borrow`
- **Request Body**:
  ```json
  {
    "borrowerId": "BORROWER_ID",
    "bookId": "BOOK_ID"
  }
  ```
- **Rules**:
  - Premium members can borrow up to 10 books.
  - Standard members can borrow up to 5 books.
  - Cannot borrow if `availableCopies` is 0.
  - Borrowers with overdue books are restricted.

#### 2. Return a book
- **Endpoint**: `POST /api/return`
- **Request Body**:
  ```json
  {
    "borrowerId": "BORROWER_ID",
    "bookId": "BOOK_ID"
  }
  ```


