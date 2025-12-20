
const createuser = "insert into users (email,password,role) values (?,?,?)";
const registerstudent = "insert into students (name,email,course_id,mobile_no) values (?,?,?,?)";
const loginuser = "select * from users where email=? and password=?";

module.exports = {
  createuser,
  registerstudent,
  loginuser
}; 