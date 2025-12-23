const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

const{videos} =require("../controller/video.controller");
const{addvideo}=require("../controller/video.controller");
const {deleteVideo} = require("../controller/video.controller")
const allowRoles = require("../middlewares/role.middleware");

router.get("/all-videos/:course_id",authUser,allowRoles("admin"),videos);
router.post("/add-video",authUser, allowRoles("admin") ,addvideo);
router.delete("/delete-video/:video_id", authUser, allowRoles("admin"), deleteVideo)
module.exports = router;