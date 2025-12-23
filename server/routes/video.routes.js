const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

const{videos} =require("../controller/video.controller");
const{addvideo}=require("../controller/video.controller");
const allowRoles = require("../middlewares/role.middleware");

router.get("/video/all-videos",authUser,videos);
router.post("/video/add",authUser, allowRoles("admin") ,addvideo);

module.exports = router;