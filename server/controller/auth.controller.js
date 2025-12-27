const pool = require("../config/db");
const { loginuser } = require("../services/auth.services");
const { getUserDetails } = require("../services/auth.services");
const crypto = require("crypto-js");
const { generateToken } = require("../utils/jwt");


function loginUser(req, res) {
    const { email, password } = req.body;
    const hash = crypto.SHA256(password).toString();
    pool.query(loginuser, [email, hash], (err, results) => {
        if (err) {
            console.error("Error during login:", err);
            return res.status(500).send({
                status: "ERROR",
                message: "Login failed : "
            });
        } 
        if (results.length === 0) {
            return res.status(401).send({
                status: "ERROR",
                message: "Invalid email or Password"
            });
        }

        token = generateToken({ email: results[0].email, role: results[0].role, name: results[0].name });
        res.send({
            status: "SUCCESS",
            message: "Login Successful",
            data: {
                role: results[0].role,
                email: results[0].email,
                name: results[0].name
            },
            token: token
        });
    });
}
function getUserDetailsController(req, res) {
  const email = req.body.email || req.user.email;

  pool.query(getUserDetails, [email], (err, results) => {
    if (err) {
      return res.status(500).send({
        status: "ERROR",
        message: "Failed to fetch user details"
      });
    }

    if (!results.length) {
      return res.status(404).send({
        status: "ERROR",
        message: "User not found"
      });
    }

    res.send({
      status: "SUCCESS",
      message: "User details fetched successfully",
      data: {
        email: results[0].email,
        role: results[0].role,

        students: results.map(r => ({
          name: r.student_name,
          course_id: r.course_id,
          mobile_no: r.mobile_no,
          profile_pic: r.profile_pic
        }))
      }
    });
  });
}

module.exports = {
    loginUser,
    getUserDetailsController
};