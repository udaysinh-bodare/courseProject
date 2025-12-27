
const createuser = "insert into users (email,password,role) values (?,?,?)";
const registerstudent = "insert into students (name,email,course_id,mobile_no) values (?,?,?,?)";
const loginuser = "select * from users where email=? and password=?";
const allusers = "select * from users where email = ?"

const getUserDetails = `
  SELECT u.email, u.role,
         s.name AS student_name,
         s.course_id,
         s.mobile_no,
         s.profile_pic
  FROM users u
  LEFT JOIN students s ON u.email = s.email
  WHERE u.email = ?
`;


module.exports = {
  createuser,
  registerstudent,
  loginuser,
  allusers,
  getUserDetails
};
