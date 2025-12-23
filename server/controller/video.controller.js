const pool = require("../config/db");
const {allVideo}=require("../services/video.services")
const {addVideo}=require("../services/video.services")

function videos(req,res){
    pool.query(allVideo,(err,result)=>{
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


module.exports={videos , addvideo}
