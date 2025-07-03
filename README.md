# Bookstore REST API  

A secure RESTful API for managing users and books with JWT authentication, file-based persistence, user ownership enforcement, and request validation. Built with Node.js and Express.

## Features

- User registration and login with JWT (stored in HTTP-only cookies)
- CRUD operations for books (only the owner can update/delete)
- Input validation and error handling
- Request logging middleware
- Pagination for book listing
- API documentation with Swagger UI

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/faju-frq/Book-API
   cd Book-API
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment variables:**

   - Create a `.env` file in the root directory (if needed).
   - Example:
     ```env
     PORT=5000
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the server:**
   ```bash
   npm start
   ```

---

## API Documentation

- Swagger UI is available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- All endpoints are documented with request/response schemas and authentication requirements.

---

## How to Test Endpoints
### Using Swagger Endpoint

1. Open `http://localhost:5000/api-docs` in your browser to explore and test endpoints directly.

### Using Postman
#### Test user endpoints
1. Register a new user via `POST /api/auth/register`.
   - Remember to add the following
     ```bash
      {
        "email":"Your_exmaple_email",
        "password": "Your_example_password"
      }
     ```
     in your body as raw-json
2. Login via `POST /api/auth/login` (JWT will be set in a cookie.)
   - Remember to add the following
     ```bash
      {
        "email":"Your_exmaple_email",
        "password": "Your_example_password"
      }
     ```
     in your body as raw-json
3. Use the returned cookie for authenticated requests (Postman handles cookies automatically).
#### Test Book endpoints
   1. `POST /api/books` to create a book
      - Remember to add the following
        ```bash
        {
          "title": "Your_book_title",
          "author": "Your_book_author",
          "genre": "Your_book-genre",
          "publishedYear": "Your_book_published_year"
        }
        ```
        in your body as raw-json
   2. `GET /api/books` to list books.
       > [!TIP]
       > To limit the number of items to display at a time provide `?limit=` at the end of the api and to view paginated add `?page="page_no"&limt="limit_no"`
   3. `GET /api/books/search?genre="Your_choice_of_genre"` to filter by genre
   4. `GET /api/books/id` to get a book by its id.
   5. `PUT /api/books/{id}` to update the book details.
       > [!WARNING]
       > only users who are the owner of that specific book data can update it
   6. `DELETE /api/books/{id}` for update/delete
       > [!WARNING]
       > Only an owner of the book data can delete it.

---

## Notes

- All protected endpoints require authentication via the JWT cookie.
- Input validation errors and other errors are returned as JSON.
- For full API details, see Swagger UI at `/api-docs`.
