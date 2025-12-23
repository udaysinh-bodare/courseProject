const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware")
const { loginUser} = require("../controller/auth.controller");
const { registerToCourse } = require("../controller/studentregister.controller");


router.post("/register-to-course", authUser, registerToCourse);
router.post("/login", authUser, loginUser);

module.exports = router;