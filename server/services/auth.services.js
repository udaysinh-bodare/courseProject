
const createuser = "insert into users (email,password,role) values (?,?,?)";
const registerstudent = "insert into students (name,email,course_id,mobile_no) values (?,?,?,?)";
const loginuser = "select * from users where email=? and password=?";

const allVideo="select * from videos"
const addVideo="insert into videos(course_id,title,discription,youtube_url) values(?,?,?,?)";
const allCourse="select * from courses"

module.exports = {
  createuser,
  registerstudent,
  loginuser,
  allCourse,
  allVideo,
  addVideo
}; 
