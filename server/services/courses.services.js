const getallcourses = `select courses.course_id, course_name, start_date, end_date, video_expire_days, video_id, title, added_at
	from courses
	JOIN videos ON courses.course_id = videos.course_id
	where current_date() < date_add(added_at , INTERVAL video_expire_days DAY)`;

const allCourse="select * from courses"

const getstudentsbycourses = `select * from students where course_id = ?`


getCourseDetailsql = `select * from courses where course_id = ?`

module.exports = {
    getallcourses,
	allCourse,
	getstudentsbycourses,
	getCourseDetailsql
}