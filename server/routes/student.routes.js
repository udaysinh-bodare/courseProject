const express = require("express");
const authUser = require("../middlewares/auth.middleware")
const router  = express.Router();
const {changePassword,myCourses,myCoursesandvedio} = require("../controller/student.controller")
const { registerToCourse } = require("../controller/student.controller");


<<<<<<< HEAD
=======

router.post("/register-to-course", authUser, registerToCourse);
>>>>>>> 7bb3d7fd099c7fade04e2dc86c3690107620dd35
router.put("/changepass",authUser,changePassword)
router.get("/my-courses",authUser,myCourses)
router.get("/my-courses-and-videos",authUser,myCoursesandvedio)
module.exports = router