const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized: No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
