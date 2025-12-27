import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { registerStudent } from "../../services/studentServices";
import { getCourseDetails } from "../../services/coursesServices";
import bg from "../../assets/background.png";

function Register() {
  const navigate = useNavigate();
  const { course_id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_no, setMobile] = useState("");

  // const [profile_pic, setProfilePic] = useState(null);

  const [cr_detail, setCr_detail] = useState({
    course_name: "",
    start_date: "",
    end_date: "",
    fees: "",
  });

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const setCard = async () => {
    const res = await getCourseDetails(course_id);
    const data = res.data.data[0];

    console.log(data);
    

    setCr_detail({
      course_name: data.course_name,
      start_date: formatDate(data.start_date),
      end_date: formatDate(data.end_date),
      fees: data.fees,
    });
  };

  useEffect(() => {
    setCard();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !mobile_no) {
      toast.warn("All fields are required");
      return;
    }

    try {
      const res = await registerStudent(
        name,
        email,
        password,
        course_id,
        mobile_no
      );

      console.log(res);
      

      if (res.data.status === "SUCCESS") {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-wrap items-center justify-center gap-10 bg-cover p-5"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* COURSE CARD */}
      <div className="bg-white/20 p-6 rounded-2xl min-w-[300px]">
        <div className="h-[180px] bg-gradient-to-br from-sky-300 to-blue-200 rounded-lg flex justify-center items-center">
          <span className="text-3xl text-blue-500">📘</span>
        </div>

        <h1 className="text-lg font-bold mt-3">
          Course Name: {cr_detail.course_name}
        </h1>
        <h3>Start Date: {cr_detail.start_date}</h3>
        <h3>End Date: {cr_detail.end_date}</h3>
        <h3 className="font-semibold">
          Fees: <span className="text-green-500">₹ {cr_detail.fees}</span>
        </h3>
      </div>

      {/* REGISTER FORM */}
      <div
        className="bg-white/20 lg:min-w-[35%] md:min-w-[35%] sm:min-w-[30%]
                            backdrop-blur-md rounded-xl border border-white/30
                            px-6 py-1 shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]"
      >
        <h1 className="text-4xl text-center mb-3 font-bold text-blue-900 py-2">
          Login
        </h1>

        <form>
          <div className="flex flex-col mb-5">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Name
            </label>
            <div className="flex items-center bg-gray-100 px-2 rounded-md">
              <i className="fa-solid fa-user text-xl"></i>
              <input
                type="text"
                className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col mb-5">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Email
            </label>
            <div className="flex items-center bg-gray-100 px-2 rounded-md">
              <i className="fa-solid fa-envelope text-xl"></i>
              <input
                type="text"
                className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col mb-5">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Password
            </label>
            <div className="flex items-center bg-gray-100 px-2 rounded-md">
              <i className="fa-solid fa-key text-xl"></i>
              <input
                type="password"
                className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Course Id
            </label>
            <div className="flex items-center bg-gray-100 px-2 rounded-md">
              {/* <i className="fa-solid fa-envelope text-xl"></i> */}
              <input
                type="text"
                className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                placeholder={course_id}
                // onChange={(e) => setEmail(course_id)}
                value={course_id}
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Mobile
            </label>
            <div className="flex items-center bg-gray-100 px-2 rounded-md">
              <i className="fa-solid fa-envelope text-xl"></i>
              <input
                type="text"
                className="bg-gray-100 rounded-md p-1.5 w-full focus:outline-none"
                placeholder="Enter Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={signUp}
              className="text-xl border border-green-400 bg-[#1aac9f]
                               hover:opacity-80 cursor-pointer py-2 rounded-3xl
                               text-white font-semibold px-7"
            >
              Login
            </button>
          </div>

          {/* Register link */}
          <div className="mt-5 mb-5 text-center">
            Don&apos;t have an account?
            <Link className="text-blue-700 ml-1 hover:underline" to="/register">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
