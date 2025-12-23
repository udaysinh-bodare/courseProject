const pool = require("../config/db");
const {allVideo}=require("../services/video.services")
const {addVideo}=require("../services/video.services")
const {delete_Video_sql} = require("../services/video.services")

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
    const {course_id,title,discription,youtube_url}=req.body;
    pool.query(addVideo,[course_id,title,discription,youtube_url],(err,result)=>{
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

function deleteVideo(req, res) {
    const video_id = req.params.video_id
    if(!video_id) {
        return res.status(403).json({
            "status" : "Error",
            "message": "Video_id not found."
        })
    }
    pool.query(delete_Video_sql, [video_id], (error, data)=>{
        if(data) {
            if(data.length == 0) {
                return res.status(400).json({
                    "status" : "Error",
                    "message": "Video_id not avaiable."
                })
            }
            else {
                res.status(200).json({
                    status: "Success",
                    data: data
                })
            }
        }
        else {
            res.status(500).send(error)
        }
    })
}


module.exports={videos , addvideo, deleteVideo}
