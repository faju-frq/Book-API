import { readJSON, writeJSON } from "../utils/fileHandler.util.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const usersFilePath = "./models/users.json";

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const users = await readJSON(usersFilePath);
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), email, password: hashedPassword };
    users.push(newUser);
    await writeJSON(usersFilePath, users);
    res.status(201).json({ message: "User registered successfully" ,id:newUser.id});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const users = await readJSON(usersFilePath);
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 3600000,
      })
      .json({
        message: "Login successful",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}