export function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}