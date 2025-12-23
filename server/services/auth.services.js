
const createuser = "insert into users (email,password,role) values (?,?,?)";
const registerstudent = "insert into students (name,email,course_id,mobile_no) values (?,?,?,?)";
const loginuser = "select * from users where email=? and password=?";
const allusers = "select * from users where email = ?"


module.exports = {
  createuser,
  registerstudent,
  loginuser,
<<<<<<< HEAD
  // allCourse,
=======
>>>>>>> 7bb3d7fd099c7fade04e2dc86c3690107620dd35
  allusers
}; 
