const getallcourses = `select course_id, course_name, start_date, end_date, video_expire_days FROM courses
	WHERE current_date() < end_date`;

const allCourse="select * from courses"

const getstudentsbycourses = `select * from students where course_id = ?`


getCourseDetailsql = `select * from courses where course_id = ?`

module.exports = {
    getallcourses,
	allCourse,
	getstudentsbycourses,
	getCourseDetailsql
}