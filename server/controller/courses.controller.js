const express = require("express");

const pool = require("../config/db");
const result = require("../utils/result");
const {
    get_course_sql,
    update_course_sql,
    delete_course_sql,
} = require("../services/admin.services");
const {
	getallcourses
} = require("../services/courses.services")

function addCourse(req, res) {
    const {
        course_name,
        description,
        fees,
        start_date,
        end_date,
        video_expire_days,
    } = req.body;
    const sql = `INSERT INTO courses(course_name, description, fees, start_date, end_date, video_expire_days) VALUES (?,?,?,?,?,?)`;
    pool.query(
        sql,
        [
            course_name,
            description,
            fees,
            start_date,
            end_date,
            video_expire_days,
        ],
        (error, data) => {
            if (data) {
                res.send(result.createResult(null, data));
            } else {
                res.send(result.createResult(error));
            }
        }
    );
}

function getCourses(req, res) {
    const { start_date, end_date } = req.body;
    pool.query(get_course_sql, [start_date, end_date], (error, data) => {
        if (data) {
            if (data.length == 0)
                res.send(
                    result.createResult("No Course Exist between these dates")
                );
            else res.send(result.createResult(null, data));
        } else res.send(result.createResult(error));
    });
}

function updateCourse(req, res) {
    const course_id = req.params.course_id;
    const {
        course_name,
        description,
        fees,
        start_date,
        end_date,
        video_expire_days,
    } = req.body;
    pool.query(
        update_course_sql,
        [
            course_name,
            description,
            fees,
            start_date,
            end_date,
            video_expire_days,
            course_id,
        ],
        (error, data) => {
            if (data) {
                if (data.length == 0)
                    res.send(result.createResult("Course id does'nt match"));
                else res.send(result.createResult(null, data));
            } else res.send(result.createResult(error));
        }
    );
}

function deleteCourse(req, res) {
    const course_id = req.params.course_id;
    pool.query(delete_course_sql, [course_id], (error, data) => {
        if (data) {
            if (data.length == 0)
                res.send(result.createResult("Course id does'nt match"));
            else res.send(result.createResult(null, data));
        } else res.send(result.createResult(error));
    });
}

function activeCourses(req, res) {
	pool.query(getallcourses , [] , (err , data) => {
		if (data){
			if (data.length == 0)
				res.send(result.createResult("No courses available"));
			else res.send(result.createResult(null, data));
		}
		else	res.send(result.createResult(err))
	})
}

module.exports = { addCourse, getCourses, updateCourse, deleteCourse , activeCourses };
