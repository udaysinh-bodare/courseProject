const changePasswordsql =  "update users set password = ?";
const myCoursessql = "select course_name , description from students natural join courses where email = ?"
const myCourseandvediosql = "select course_name , courses.description, youtube_url from students natural join courses inner join videos using (course_id) where email = ?"

module.exports = {
    changePasswordsql,
    myCoursessql,
    myCourseandvediosql
}
