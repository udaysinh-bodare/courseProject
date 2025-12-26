const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware")
const { loginUser} = require("../controller/auth.controller");
router.post("/login", authUser, loginUser);

router.get("/profile", authUser, (req, res) => {
  const userId = req.user.id; // from token
  const user = users.find(u => u.id === userId);
  res.json(user);
});


module.exports = router;