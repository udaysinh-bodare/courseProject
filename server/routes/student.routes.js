const express = require("express");
const authUser = require("../middlewares/auth.middleware")
const router  = express.Router();
const {changePassword,myCourses,myCoursesandvedio, myCourseDescription} = require("../controller/student.controller")
const { registerToCourse } = require("../controller/student.controller");



router.post("/register-to-course", authUser, registerToCourse);
router.put("/changepass",authUser,changePassword)
router.get("/my-courses",authUser,myCourses)
router.get("/my-course-description", authUser, myCourseDescription)
router.get("/my-courses-and-videos",authUser,myCoursesandvedio)
module.exports = router