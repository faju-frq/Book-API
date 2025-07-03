import {
  createBooks,
  searchBooksByGenre,
  getBookById,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import {
  bookValidation,
  bookUpdateValidation,
} from "../middlewares/validations/books.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";

const router = Router();


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *                genre:
 *                  type: string
 *                publishedYear:
 *                  type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *                genre:
 *                  type: string
 *                publishedYear:
 *                  type: integer
 *       400:
 *         description: Validation error or book already exists
 *       401:
 *         description: Unauthorized/validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, bookValidation, validateRequest, createBooks);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books (paginated)
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of books per page
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *                id:
 *                  type: string
 *                  format: uuid
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *                genre:
 *                  type: string
 *                publishedYear:
 *                  type: number
 *                  format: double
 *                userId:
 *                  type: string
 *                  format: uuid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getBooks);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search books by genre
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Genre to filter by
 *     responses:
 *       200:
 *         description: List of books filtered by genre
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/search", authMiddleware, searchBooksByGenre);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID (only owner)
 *     description: You can update any of the following properties individually or as a group. please remember to not add "," at the end before "}"
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              author:
 *               type: string
 *              genre:
 *               type: string
 *              publishedYear:
 *               type: number
 *               format: double
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  authMiddleware,
  bookUpdateValidation,
  validateRequest,
  updateBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID (only owner)
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, deleteBook);

export default router;
