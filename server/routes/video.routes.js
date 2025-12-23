const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

const{videos} =require("../controller/video.controller");
const{addvideo}=require("../controller/video.controller");
const allowRoles = require("../middlewares/role.middleware");

router.get("/all-videos/:course_id",authUser,allowRoles("admin"),videos);
router.post("/add-video",authUser, allowRoles("admin") ,addvideo);

module.exports = router;