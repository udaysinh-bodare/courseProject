const pool = require("../config/db");
const {allVideo}=require("../services/video.services")
const {addVideo}=require("../services/video.services")
const {updateVideo} = require("../services/video.services")

function videos(req,res){
    const course_id = req.params.course_id
    if(!course_id){
        return res.status(403).json({
            "status" : "Error",
            "message": "Course ID not found."
        })
    }
    pool.query(allVideo, [course_id] ,(err,result)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.status(200).json({
                status:"success",
                data:result
            })
        }
    })
}


function addvideo(req,res){
    const {course_id,title,description,youtube_url}=req.body;
    pool.query(addVideo,[course_id,title,description,youtube_url],(err,result)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json({
                status:"success",
                data:result
            })
        }
    })
}


function updatevideo(req , res){
    const video_id = req.params.video_id
    const { course_id , title , description , youtube_url } = req.body
    if(!video_id){
        return res.status(403).json({
            "status" : "Error",
            "message": "Video ID not found."
        })
    }
    pool.query(updateVideo, [course_id , title , description, youtube_url , video_id] ,(err,result)=>{
        if(err){
            return res.status(500).send(err)
        }else{
            return res.status(200).json({
                status:"success",
                data:result
            })
        }
    })
}

module.exports={videos , addvideo , updatevideo}
