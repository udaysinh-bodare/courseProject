const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

const{videos, updatevideo} =require("../controller/video.controller");
const{addvideo}=require("../controller/video.controller");
const {deleteVideo} = require("../controller/video.controller")
const allowRoles = require("../middlewares/role.middleware");

<<<<<<< HEAD
router.get("/all-videos",authUser,videos);
router.post("/add",authUser, allowRoles("admin") ,addvideo);
=======
router.get("/all-videos/:course_id",authUser,allowRoles("admin"),videos);
router.post("/add-video",authUser, allowRoles("admin") ,addvideo);
<<<<<<< HEAD
>>>>>>> 7bb3d7fd099c7fade04e2dc86c3690107620dd35
=======
router.delete("/delete-video/:video_id", authUser, allowRoles("admin"), deleteVideo)
router.put("/update-video/:video_id",authUser, allowRoles("admin") ,updatevideo);
>>>>>>> 05960a46f9796cfa81dfc92fa4e1b022c580e3be

module.exports = router;