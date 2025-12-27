import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { registerStudent } from "../../services/studentServices";
import bg from "../../assets/background.png";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course_id, setCourseId] = useState("");
  const [mobile_no, setMobile] = useState("");
  const [profile_pic, setProfilePic] = useState(null);

  const signUp = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.warn("Name is required");
      return;
    }
    if (!email) {
      toast.warn("Email is required");
      return;
    }
    if (!password) {
      toast.warn("Password is required");
      return;
    }
    if (!mobile_no) {
      toast.warn("Mobile number is required");
      return;
    }

    try {
      const res = await registerStudent(
        name,
        email,
        password,
        course_id,
        mobile_no,
        profile_pic
      );

      if (res.data.status === "SUCCESS") {
        toast.success("Registered successfully! Please login.");
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid details entered");
    }
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center px-4"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div
        className="bg-white/20 lg:min-w-[35%] md:min-w-[35%] sm:min-w-[30%]
                   backdrop-blur-md rounded-xl border border-white/30
                   px-6 py-3 shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]"
      >
        <h1 className="text-3xl text-center mb-5 font-bold text-blue-900 py-2">
          Register Student
        </h1>

        <form>
          {/* Name */}
          <div className="flex flex-col mb-6">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              className="bg-gray-100 rounded-md p-2 focus:outline-none"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col mb-6">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="bg-gray-100 rounded-md p-2 focus:outline-none"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-6">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="bg-gray-100 rounded-md p-2 focus:outline-none"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Course ID */}
          <div className="flex flex-col mb-6">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Course ID
            </label>
            <input
              type="number"
              className="bg-gray-100 rounded-md p-2 focus:outline-none"
              placeholder="Enter Course ID"
              onChange={(e) => setCourseId(e.target.value)}
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col mb-6">
            <label className="text-xl mb-1 ml-1 font-semibold text-gray-600">
              Mobile Number
            </label>
            <input
              type="tel"
              className="bg-gray-100 rounded-md p-2 focus:outline-none"
              placeholder="Enter Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={signUp}
              className="text-xl border border-green-400 bg-[#1aac9f]
                         hover:opacity-80 py-2 rounded-3xl
                         text-white font-semibold px-7"
            >
              Register
            </button>
          </div>

          {/* Login link */}
          <div className="mt-5 mb-5 text-center">
            Already have an account?
            <Link className="text-blue-700 ml-1 hover:underline" to="/login">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
