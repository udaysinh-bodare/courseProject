const getallcourses = `select * FROM courses
	WHERE current_date() < end_date`;

const allCourse="select * from courses"

const getstudentsbycourses = `select * from students where course_id = ?`


const getCourseDetailsql = `select * from courses where course_id = ?`

module.exports = {
    getallcourses,
	allCourse,
	getstudentsbycourses,
	getCourseDetailsql
}