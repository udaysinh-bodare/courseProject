const result = require("../utils/result");

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .send(result.createResult("Access denied"));
    }
    next();
  };
};

module.exports = allowRoles;
