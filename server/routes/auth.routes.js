const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");
const { registerToCourse } = require("../controller/auth.controller");



router.post("/register-to-course", authUser, registerToCourse);

module.exports = router;