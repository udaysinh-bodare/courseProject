const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/auth.middleware");

//const videoRoutes = require("./routes/video.routes");

const{videos} =require("../controller/video.controller");
const{addvideo}=require("../controller/addVideo.controller");

router.get("/video/all-videos",authUser,videos);
router.post("/video/add",authUser,addvideo);

module.exports = router;