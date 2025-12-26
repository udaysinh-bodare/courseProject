import React, { useContext, useState } from "react";
import { Link, Links, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { loginContext } from "../../App";
import Register from "./Register";
import { loginStudent } from "../../services/studentServices";
import bg from "../../assets/background.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginStatus, setLoginStatus } = useContext(loginContext);

  const signIn = async (e) => {
    e.preventDefault();
    if (!email) toast.warn("Email Is Empty!");
    else if (!password) toast.warn("Password Is Empty");
    setLoginStatus(true);
    
    try {
      const res = await loginStudent(email, password);
      if (res.data.status == "SUCCESS") {
        console.log("hi");
        console.log(res.data.token);
        console.log(loginStatus);

        localStorage.setItem("token", res.data.token);
        toast.success("Logged In Successfully!");
        navigate("/student/dashboard");
      }
    } catch (ex) {
      console.log(ex);

      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div>
      <div
        className="wrapper h-screen w-full  flex justify-center items-center px-4"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <div className="login-box bg-white/20 lg:min-w-[35%] md:min-w-[35%] sm:min-w-[30%]  backdrop-blur-md  rounded-xl   border border-white/30   px-6 py-3 shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]">
          <h1 className="text-4xl text-center mb-10 font-bold text-blue-900 py-2">
            Login
          </h1>

          <form>
            <div className="email-box flex flex-col mb-10">
              <label
                htmlFor="email"
                className="text-xl mb-2 ml-1 font-semibold text-gray-600"
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

            <div className="pass-box flex flex-col mb-10">
              <label
                htmlFor="password"
                className="text-xl mb-2 ml-1 font-semibold text-gray-600"
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

            <div className="btn w-full flex justify-center">
              <button
                className="text-xl border border-green-400 bg-[#1aac9f] hover:opacity-[.8] cursor-pointer py-2 rounded-3xl text-white font-semibold px-7 flex items-center p-[0_0_10px_0]"
                onClick={signIn}
              >
                Login
              </button>
            </div>

            <div className="mess mt-5 mb-5 text-center">
              Don't have an account?
              <Link
                className="text-blue-700 border-b-blue-700 no-underline hover:underline"
                to="/register"
              >
                {" "}
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
