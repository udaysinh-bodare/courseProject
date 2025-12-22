const express = require("express");
const authUser = require("../middlewares/auth.middleware")
const router  = express.Router();
const {changePassword,myCourses} = require("../controller/studentregister.controller")

router.put("/changepass",authUser,changePassword)
router.get("/my-courses",authUser,myCourses)
module.exports = router