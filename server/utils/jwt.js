const jwt = require("jsonwebtoken");
const config = require("./config"); 

// Generate JWT
function generateToken(payload) {
  return jwt.sign(
    payload,
    config.SECRET,
    {
      expiresIn: "1h"
    }
  );
}

// Verify JWT
function verifyToken(token) {
  return jwt.verify(token, config.SECRET);
}

module.exports = {
  generateToken,
  verifyToken
};
