import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { loginStudent } from "../../services/studentServices";
import bg from "../../assets/background.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Email is empty!");
      return;
    }

    if (!password) {
      toast.warn("Password is empty!");
      return;
    }

    try {
      const res = await loginStudent(email, password);

      if (res.data.status === "SUCCESS") {
        // 🔑 Store token
        localStorage.setItem("token", res.data.token);

        toast.success("Logged in successfully!");
        navigate("/student/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center px-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white/20 lg:min-w-[35%] md:min-w-[35%] sm:min-w-[30%]
                      backdrop-blur-md rounded-xl border border-white/30
                      px-6 py-3 shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]">
        <h1 className="text-4xl text-center mb-10 font-bold text-blue-900 py-2">
          Login
        </h1>

        <form>
          {/* Email */}
          <div className="flex flex-col mb-10">
            <label className="text-xl mb-2 ml-1 font-semibold text-gray-600">
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
          <div className="flex flex-col mb-10">
            <label className="text-xl mb-2 ml-1 font-semibold text-gray-600">
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

          {/* Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={signIn}
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
            <Link
              className="text-blue-700 ml-1 hover:underline"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
