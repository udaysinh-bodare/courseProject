import React, { useContext, useEffect, useState } from "react";
import { Link, Links, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { loginContext } from "../../App";
// import Register from "./Register";
import { loginStudent } from "../../services/studentServices";
import bg from "../../assets/background.png";
import { registerStudent } from "../../services/studentServices";
import { getCourseDetails } from "../../services/coursesServices";
function Register() {

  useEffect(()=>{
    setCard()
  },[])
  
  const [cr_detail, setCr_detail] = useState({
            course_id: null,
            course_name: "" ,
            description: "",
            fees: null,
            start_date : "",
            end_date: "",
            video_expire_days: null
  })



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [course_id, setcourseId] = useState(null);
  const [mobile_no, setmobile] = useState("");
  const [profile_pic, setprofilePic] = useState(null);

  const {course_id} = useParams()

  const setCard = async ()=>{
    console.log(course_id);
    
    const res = await getCourseDetails(course_id)
    console.log(res);

    console.log("date: ", formatDate(res.data.data[0].start_date));
    
    
    setCr_detail({
            course_id: course_id,
            course_name: res.data.data[0].course_name ,
            description: res.data.data[0].description,
            fees: res.data.data[0].fees,
            start_date : formatDate(res.data.data[0].start_date),
            end_date: formatDate(res.data.data[0].end_date),
            video_expire_days: res.data.data[0].video_expire_days
    })

    
  }
  const formatDate = (isoString)=> {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}



  

  const signUp = async (e) => {
    console.log(name);
    console.log(email);
    console.log(course_id);
    console.log(password);
    console.log(mobile_no);

    e.preventDefault();
    if (!name) toast.warn("Name is Empty");
    else if (!email) toast.warn("Email is Empty");
    else if (!password) toast.warn("Password is Empty");
    // else if (!course_id) toast.warn("Course Id Not Entered");
    else if (!mobile_no) toast.warn("Mobile Number Not Entered");
    else {
      try {
        const res = await registerStudent(
          name,
          email,
          password,
          course_id,
          mobile_no,
          profile_pic
        );
        const course_id = res.request.params.course_id
        
        console.log(res);

        if (res.data.status == "SUCCESS") {
          toast.success("Registered to the course successfuly");
        }
      } catch (ex) {
        toast.error("Invalid Details Entered");
        console.log(ex);
      }
    }
  };



  return (
    <div>
      <div>
        <div
          className="wrapper min-h-screen w-full  flex  items-center px-4 flex-wrap gap-50 bg-fixed p-4 justify-center "
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "fixed" }}
        >

          <div
              className="card bg-white/20 p-6 rounded-2xl  shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]
                   flex flex-col gap-3 hover:scale-105 transition-transform min-w-[300px]"
              style={{cursor: "pointer"}}
            >
              <div className="pic w-full h-[180px] bg-gradient-to-br from-sky-300 to-blue-200 rounded-lg flex justify-center items-center">
                <span class="text-3xl text-blue-500">📘</span>
              </div>

              <h1 className="text-lg font-bold">
                Course Name: {cr_detail.course_name}
              </h1>

      

              <h3 className="text-sm font-semibold">Start Date: {cr_detail.start_date}</h3>

              <h3 className="text-sm font-semibold">End Date: {cr_detail.end_date}</h3>

              <div className="flex gap-5">
                <h3 className="text-md font-semibold">Fees: <span className="text-green-500">₹ {cr_detail.fees}</span></h3>

              </div>

            </div>

          <div className="login-box bg-white/20 lg:min-w-[30%] md:min-w-[35%] sm:min-w-[30%] backdrop-blur-md  rounded-xl   border border-white/30   px-6 py-3 shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]">
            <h1 className="text-3xl text-center mb-5 font-bold text-blue-900 py-2">
              Register Student
            </h1>

            <form>
              <div className="name-box flex flex-col mb-6">
                <label
                  htmlFor="name"
                  className="text-xl mb-1 ml-1 font-semibold text-gray-600"
                >
                  Name
                </label>
                <div className="iconNInput flex items-center bg-gray-100 px-2 rounded-md">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                    placeholder="Enter Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="email-box flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="text-xl mb-1 ml-1 font-semibold text-gray-600"
                >
                  Email
                </label>
                <div className="iconNInput flex items-center bg-gray-100 px-2 rounded-md">
                  <i className="fa-solid fa-envelope text-xl"></i>
                  <input
                    type="text"
                    className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                    placeholder="Enter Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="pass-box flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="text-xl mb-1 ml-1 font-semibold text-gray-600"
                >
                  Password
                </label>
                <div className="iconNInput flex items-center bg-gray-100  px-2 rounded-md">
                  <i className="fa-solid fa-key text-xl"></i>
                  <input
                    type="password"
                    className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                    placeholder="Enter Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="courseId-box flex flex-col mb-6">
                <label
                  htmlFor="courseId"
                  className="text-xl mb-1 ml-1 font-semibold text-gray-600"
                >
                  CourseId
                </label>
                <div className="iconNInput flex items-center bg-gray-100 px-2 rounded-md">
                  <input
                    type="number"
                    className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                    placeholder={course_id}
                    required
                    readOnly
                    value={course_id}
                  />
                </div>
              </div>

              <div className="mobile-box flex flex-col mb-6">
                <label
                  htmlFor="mobile"
                  className="text-xl mb-1 ml-1 font-semibold text-gray-600"
                >
                  Mobile Number
                </label>
                <div className="iconNInput flex items-center bg-gray-100 px-2 rounded-md">
                  <i className="fa-solid fa-phone text-xl"></i>
                  <input
                    type="tel"
                    className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                    placeholder="Enter Mobile Number"
                    required
                    onChange={(e) => setmobile(e.target.value)}
                  />
                </div>
              </div>

              <div className="btn w-full flex justify-center">
                <button
                  className="text-xl border border-green-400 bg-[#1aac9f] hover:opacity-[.8] cursor-pointer py-2 rounded-3xl text-white font-semibold px-7 flex items-center p-[0_0_10px_0]"
                  onClick={signUp}
                >
                  Register
                </button>
              </div>

              <div className="mess mt-5 mb-5 text-center">
                Don't have an account?
                <Link
                  className="text-blue-700 border-b-blue-700 no-underline hover:underline"
                  to="/login"
                >
                  {" "}
                  SignIn
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
