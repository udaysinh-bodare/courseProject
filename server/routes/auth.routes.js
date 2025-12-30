const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware")
const { loginUser} = require("../controller/auth.controller");
const { getUserDetailsController } = require("../controller/auth.controller");


router.post("/login", authUser, loginUser);
router.post("/userdetails", authUser, getUserDetailsController);

module.exports = router;