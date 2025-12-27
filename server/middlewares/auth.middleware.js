const jwt = require("jsonwebtoken");
const result = require("../utils/result");
const config = require("../utils/config");

function authUser(req, res, next) {
  console.log("Path : " , req.path);
  const publicRoutes = [
    "/login",
    "/register-to-course",
    "/allvideo",
    "/all-active-courses"
  ];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const token = req.headers.token;
  console.log(token);
  

  if (!token) {
    return res
      .status(401)
      .send(result.createResult("Token is missing"));
  }

  try {
    const payload = jwt.verify(token, config.SECRET);

    req.user = {
      email: payload.email,
      role: payload.role
    };

    return next();
  } catch (err) {
    return res
      .status(401)
      .send(result.createResult("Token is invalid"));
  }
}

module.exports = authUser;
