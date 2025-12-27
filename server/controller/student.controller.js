const pool = require("../config/db");
const { createuser, registerstudent, allusers } = require("../services/auth.services");
const crypto = require("crypto-js");
const {
  changePasswordsql,
  myCoursessql,
  myCourseandvediosql,
  course_desc_sql
} = require("../services/student.services");

// REGISTER TO COURSE
function registerToCourse(req, res) {
  const { name, email, password, course_id, mobile_no } = req.body;

  if (!name || !email || !password || !course_id || !mobile_no) {
    console.log(req.body);
    
    return res.status(400).send({
      status: "ERROR",
      message: "Missing required fields"
    });
  }

  const hash = crypto.SHA256(password).toString();

  pool.query(allusers, [email], (err, result) => {
    if (err) {
      return res.status(500).send({
        status: "ERROR",
        message: "Database error",
        error: err
      });
    }

    // USER DOES NOT EXIST
    if (result.length === 0) {
      pool.query(createuser, [email, hash, "student"], (err) => {
        if (err) {
          return res.status(500).send({
            status: "ERROR",
            message: "Failed to create user"
          });
        }

        pool.query(
          registerstudent,
          [name, email, course_id, mobile_no],
          (err, results) => {
            if (err) {
              return res.status(500).send({
                status: "ERROR",
                message: "Failed to register student"
              });
            }

            return res.status(201).send({
              status: "SUCCESS",
              message: "User registered to course successfully",
              reg_no: results.insertId
            });
          }
        );
      });
    }
    // USER ALREADY EXISTS
    else {
      pool.query(
        registerstudent,
        [name, email, course_id, mobile_no],
        (err, results) => {
          if (err) {
            return res.status(500).send({
              status: "ERROR",
              message: "Registration failed. Please try again.",
              error: err.sqlMessage
            });
          }

          return res.status(201).send({
            status: "SUCCESS",
            message: "You have successfully registered for the course.",
            reg_no: results.insertId
          });
        }
      );
    }
  });
}

// CHANGE PASSWORD
function changePassword(req, res) {
  const { password } = req.body;
  const email = req.user?.email;

  if (!password) {
    return res.status(400).send({
      status: "ERROR",
      message: "Password is required"
    });
  }

  if (!email) {
    return res.status(401).send({
      status: "ERROR",
      message: "Unauthorized"
    });
  }

  const hash = crypto.SHA256(password).toString();

  pool.query(changePasswordsql, [hash, email], (err) => {
    if (err) {
      return res.status(500).send({
        status: "ERROR",
        message: "Failed to change password"
      });
    }

    return res.send({
      status: "SUCCESS",
      message: "Password changed successfully"
    });
  });
}

// MY COURSES
function myCourses(req, res) {
  const email = req.user?.email;

  if (!email) {
    return res.status(401).send({
      status: "ERROR",
      message: "Unauthorized"
    });
  }

  pool.query(myCoursessql, [email], (err, data) => {
    if (err) {
      return res.status(500).send({
        status: "ERROR",
        message: "Failed to fetch courses"
      });
    }

    return res.send({
      status: "SUCCESS",
      message: "Courses fetched successfully",
      data: data
    });
  });
}

function myCourseDescription(req, res) {
  const email = req.user?.email;
  const sql = course_desc_sql
  pool.query(sql,[email], (error, data)=>{
    if (error) {
      return res.status(500).send({
        status: "ERROR",
        message: "Failed to fetch courses",
        error: error
      });
    }
    return res.send({
      status: "SUCCESS",
      message: "Courses fetched successfully",
      data: data
    });
  })
}

// MY COURSES AND VIDEOS
function myCoursesandvedio(req, res) {
  const email = req.user?.email;

  if (!email) {
    return res.status(401).send({
      status: "ERROR",
      message: "Unauthorized"
    });
  }

  pool.query(myCourseandvediosql, [email], (err, result) => {
    if (err) {
      return res.status(500).send({
        status: "ERROR",
        message: "Failed to fetch courses and videos"
      });
    }

    return res.send({
      status: "SUCCESS",
      message: "Courses and videos fetched successfully",
      result
    });
  });
}

module.exports = {
  registerToCourse,
  changePassword,
  myCourses,
  myCoursesandvedio,
  myCourseDescription
};
