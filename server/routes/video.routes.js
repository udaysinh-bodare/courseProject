const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

const{videos, updatevideo} =require("../controller/video.controller");
const{addvideo}=require("../controller/video.controller");
const {deleteVideo} = require("../controller/video.controller")
const allowRoles = require("../middlewares/role.middleware");

router.get("/all-videos/:course_id",authUser,allowRoles("admin"),videos);
router.post("/add-video",authUser, allowRoles("admin") ,addvideo);
<<<<<<< HEAD
router.delete("/delete-video/:video_id", authUser, allowRoles("admin"), deleteVideo)
=======
router.put("/update-video/:video_id",authUser, allowRoles("admin") ,updatevideo);

>>>>>>> ab314d2cf054860687e35d0b86ab69f39081c08a
module.exports = router;