const express = require('express')

const {getCourses, enrolledstudents} = require('../controller/courses.controller')
const {addCourse} = require('../controller/courses.controller')
const {updateCourse} = require("../controller/courses.controller")
const {deleteCourse} = require("../controller/courses.controller")
const {activeCourses} = require("../controller/courses.controller")
const allowRoles = require("../middlewares/role.middleware")
const authUser = require("../middlewares/auth.middleware");
const {getCourseDetails} = require("../controller/courses.controller")
const router = express.Router()

router.post("/courses-add", authUser, allowRoles("admin"), addCourse);
router.post("/all-courses", getCourses)
router.post("/update-course/:course_id", authUser, allowRoles("admin"), updateCourse)
router.delete("/delete-course/:course_id", authUser, allowRoles("admin"), deleteCourse)
router.get("/all-active-courses", authUser , activeCourses)
router.get("/course-details/:course_id", getCourseDetails)

router.post("/enrolled-students", authUser, allowRoles("admin"), enrolledstudents)

module.exports = router