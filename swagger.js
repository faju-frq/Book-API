import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore REST API",
      version: "1.0.0",
      description:
        "A secure RESTful API for managing users and books with JWT authentication, file-based persistence, and user ownership enforcement. Built with Node.js and Express.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "User authentication (register, login,logout)",
      },
      {
        name: "Books",
        description: "Book CRUD operations, ownership, and search",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./route/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
