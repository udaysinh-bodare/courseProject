const pool = require("../config/db");
const {allVideo}=require("../services/auth.services")

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

module.exports={videos}
