const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

const{videos, updatevideo, get_one_video} =require("../controller/video.controller");
const{addvideo}=require("../controller/video.controller");
const {deleteVideo} = require("../controller/video.controller")
const allowRoles = require("../middlewares/role.middleware");

router.get("/all-videos/:course_id",authUser,videos);
router.post("/add-video",authUser, allowRoles("admin") ,addvideo);
router.delete("/delete-video/:video_id", authUser, allowRoles("admin"), deleteVideo)
router.put("/update-video/:video_id",authUser, allowRoles("admin") ,updatevideo);
router.post("/get-video-details", authUser, allowRoles("admin"), get_one_video)


module.exports = router;