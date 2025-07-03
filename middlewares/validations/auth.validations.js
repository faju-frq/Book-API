import { body } from "express-validator";

export const registerValidation = [
  body("email").trim().notEmpty().isEmail().withMessage("Invalid email format"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter,and one number."
    ),
];
export const loginValidation = [
  body("email").trim().notEmpty().isEmail().withMessage("Invalid email format"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];
