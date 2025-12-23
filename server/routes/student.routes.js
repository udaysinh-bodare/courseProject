const express = require("express");
const authUser = require("../middlewares/auth.middleware")
const router  = express.Router();
const {changePassword,myCourses,myCoursesandvedio} = require("../controller/student.controller")

router.put("/changepass",authUser,changePassword)
router.get("/my-courses",authUser,myCourses)
router.get("/my-courses-and-videos",authUser,myCoursesandvedio)
module.exports = router