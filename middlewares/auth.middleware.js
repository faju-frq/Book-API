import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access: No token provided" });
    }
    const SECRET_KEY = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("JWT verification error:", error);
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
