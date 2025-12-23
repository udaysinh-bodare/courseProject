const changePasswordsql = "update users set password = ?";
const myCoursessql =
	"select course_name , description from students natural join courses where email = ?";


module.exports = {
	changePasswordsql,
	myCoursessql,
    
};
