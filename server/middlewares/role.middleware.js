const { createResult } = require("../utils/result");

const allowRoles = (allowedRoles) => {
  return (req, res, next) => {
    console.log(allowedRoles);
    console.log(req.user.role);
    if (allowedRoles == (req.user.role)) {
       next();
    }
    else {
    return res
      .status(403)
      .send(createResult("Access denied"));
    }
  };
};

module.exports = allowRoles;
