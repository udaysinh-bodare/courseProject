const express = require('express')

const {getCourses, enrolledstudents} = require('../controller/courses.controller')
const {addCourse} = require('../controller/courses.controller')
const {updateCourse} = require("../controller/courses.controller")
const {deleteCourse,getAllstudent} = require("../controller/courses.controller")
const {activeCourses} = require("../controller/courses.controller")
const allowRoles = require("../middlewares/role.middleware")
const authUser = require("../middlewares/auth.middleware");
const {getCourseDetails} = require("../controller/courses.controller")
const {uploadImage, returnImage, deleteImage} = require("../controller/courses.controller")
const multer = require("multer");

const router = express.Router()

router.post("/courses-add", authUser, allowRoles("admin"), addCourse);
router.post("/all-courses", getCourses)
router.put("/update-course/:course_id", authUser, allowRoles("admin"), updateCourse)
router.delete("/delete-course/:course_id", authUser, allowRoles("admin"), deleteCourse)
router.get("/all-active-courses", authUser , activeCourses)
router.get("/course-details/:course_id", getCourseDetails)

router.post("/enrolled-students", authUser, allowRoles("admin"), enrolledstudents)
router.get("/allstudents",authUser,allowRoles("admin"),getAllstudent)

const upload = multer({ dest: "uploads/tmp" });

router.post(
  "/upload-course-image",
  upload.single("image"),
  authUser,
  allowRoles("admin"),
  uploadImage
);

router.get('/courseimage/:course_id', returnImage);
router.delete('/delete-course-image/:course_id', authUser, allowRoles("admin"), deleteImage);

module.exports = router