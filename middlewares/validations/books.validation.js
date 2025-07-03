import { body } from "express-validator";

export const bookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters long"),
  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required")
    .isLength({ min: 3 })
    .withMessage("Genre must be at least 3 characters long"),
  body("publishedYear")
    .isNumeric()
    .withMessage("Published year must be a number"),
];

export const bookUpdateValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("author")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Author must be at least 3 characters long"),
  body("genre")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Genre must be at least 3 characters long"),
  body("publishedYear")
    .optional()
    .isNumeric()
    .withMessage("Published year must be a number"),
];
