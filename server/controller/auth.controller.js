const pool = require("../config/db");
const { loginuser } = require("../services/auth.services");
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
                message: "Login failed"
            });
        } 
        if (results.length === 0) {
            return res.status(401).send({
                status: "ERROR",
                message: "Invalid email or password"
            });
        }

        token = generateToken({ email: results[0].email, role: results[0].role });
        res.send({
            status: "SUCCESS",
            message: "Login successful",
            data: results[0],
            token: token
        });
    });
}

module.exports = {
    loginUser
};