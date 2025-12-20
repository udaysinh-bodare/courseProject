const pool = require("../config/db");
const { createuser, registerstudent} = require("../services/auth.services");
const crypto = require("crypto-js");

function registerToCourse(req, res) {
    const{name,email,password,courseid,mobileNo}=req.body;
     const hash = crypto.SHA256(password).toString()
    pool.query(createuser,[email,hash,"student"],(err,results)=>{
        if(err){
            console.error("Error creating user:",err);
            return res.status(500).send({
                status:"ERROR",
                message:"Failed to create user"
            });
        }
        pool.query(registerstudent,[name,email,courseid,mobileNo],(err,results)=>{
            if(err){
                console.error("Error registering student:",err);
                return res.status(500).send({
                    status:"ERROR",
                    message:"Failed to register student"
                });
            }
            res.send({
                status:"SUCCESS",
                message:"User registered to course successfully"
            });
        });
    });
}

module.exports = {
  registerToCourse
};
