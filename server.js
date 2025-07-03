import express from "express";
import authRoutes from "./route/auth.route.js";
import bookRoutes from "./route/book.route.js";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import swaggerUi from "swagger-ui-express";
import  swaggerSpec  from "./swagger.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
