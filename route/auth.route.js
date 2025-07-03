import { register, login, logout } from "../controllers/auth.controller.js";
import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/auth.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   type: string
 *                   example: User registered successfully
 *                id:
 *                  type: string
 *                  format: uuid
 *                  description: ID of the newly registered user
 *       401:
 *         description: Validation error
 *       500:
 *        description: Internal server error
 */
router.post("/register", registerValidation, validateRequest, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, JWT set in cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login Successful
 *                 email:
 *                   type: string
 *                   format: email
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginValidation, validateRequest, login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/logout", authMiddleware, logout);

export default router;
