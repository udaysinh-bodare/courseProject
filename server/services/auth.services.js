
const createuser = "insert into users (email,password,role) values (?,?,?)";
const registerstudent = "insert into student (name,email,course_id,mobile_no) values (?,?,?,?)";

module.exports = {
  createuser,
  registerstudent
};