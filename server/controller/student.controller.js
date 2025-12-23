const pool = require("../config/db");
const { createuser, registerstudent, allusers } = require("../services/auth.services");
const crypto = require("crypto-js");
const { changePasswordsql, myCoursessql } = require("../services/student.services")

function registerToCourse(req, res) {
    const { name, email, password, courseid, mobileNo } = req.body;
    const hash = crypto.SHA256(password).toString()
    pool.query(allusers, [email], (err, result) => {
        if (err) {
            return res.status(500).send({
                status: "ERROR",
                message: "databse error",
                error: err
            });
        }
        if (result.length == 0) {
            pool.query(createuser, [email, hash, "student"], (err, results) => {
                if (err) {
                    console.error("Error creating user:", err);
                    return res.status(500).send({
                        status: "ERROR",
                        message: "Failed to create user"

                    });
                }
                pool.query(registerstudent, [name, email, courseid, mobileNo], (err, results) => {
                    if (err) {
                        console.error("Error registering student:", err);
                        return res.status(500).send({
                            status: "ERROR",
                            message: "Failed to register student"
                        });
                    }
                    res.send({
                        status: "SUCCESS",
                        message: "User registered to course successfully" + `\nRegister no : ${results.insertId}`,
                        reg_no: results.insertId
                    });
                });
            });
        }
        else {
            pool.query(registerstudent, [name, email, courseid, mobileNo], (err, results) => {
                if (err) {
                    console.error("Error registering student:", err);
                    return res.status(500).send({
                        status: "ERROR",
                        message: "Failed to register student",

                    });
                }

                console.log(results);
                

                res.send({
                    status: "SUCCESS",
                    message: "User registered to course successfully" + `\nRegister no : ${results.insertId}`,
                    reg_no: results.insertId
                });
            });
        }
    })


}

function changePassword(req, res) {
    const newpassword = req.body.password;
    const hash = crypto.SHA256(newpassword).toString()
    pool.query(changePasswordsql, [hash], (err, result) => {
        if (err) {
            console.error("Error changing password :", err);
            return res.status(500).send({
                status: "ERROR",
                message: "Failed to change password"
            });
        }
        res.send({
            status: "SUCCESS",
            message: "password changed successfully"
        });
    })

}

function myCourses(req, res) {
    const email = req.user.email
    pool.query(myCoursessql, [email], (err, result) => {
        if (err) {
            console.error("Error while showing my courses :", err);
            return res.status(500).send({
                status: "ERROR",
                message: "Failed to fetch courses"
            });
        }
        res.send({
            status: "SUCCESS",
            message: "courses are fetched",
            result: result
        });
    })

}

module.exports = {
    registerToCourse,
    changePassword,
    myCourses
};
