require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const actualToken = token.split(" ")[1];

    const verified = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(400).json({ message: "Invalid token" });
  }
};
