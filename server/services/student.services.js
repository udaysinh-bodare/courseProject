const changePasswordsql =  "update users set password = ? where email = ?";
const myCoursessql = "select course_name , description from students natural join courses where email = ?"
const myCourseandvediosql = "select course_name , courses.description, youtube_url from students natural join courses inner join videos using (course_id) where email = ?"
const course_desc_sql = "select c.course_id, course_name, description, start_date, end_date from students natural join courses c where email = ?"

module.exports = {
    changePasswordsql,
    myCoursessql,
    myCourseandvediosql,
    course_desc_sql
}
