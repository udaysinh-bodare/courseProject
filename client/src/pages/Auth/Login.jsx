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
				if (res.data.data.role === "admin") {
					toast.success("Logged in successfully!");
					navigate("/allcourses");
				} else {
					toast.success("Logged in successfully!");
					navigate("/student/dashboard");
				}
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
			<div
				className="bg-white/20 lg:min-w-[30%] md:min-w-[35%] sm:min-w-[30%]
                      backdrop-blur-md rounded-xl border border-white/30
                      px-6 py-3 shadow-[0_8px_32px_12px_rgba(31,38,135,0.37)]"
			>
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
							to="/student/allcourses"
						>
							Register to course
						</Link>
					</div>
				</form>

			
<div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
  <h3 className="mb-1 font-semibold text-gray-800">
    Demo Credentials
  </h3>

  <div className="mb-2">
    <p className="font-medium text-blue-700">Admin Account</p>
    <p className="text-sm">Email: uday1234@gmail.com</p>
    <p className="text-sm">Password: uday1234</p>
  </div>

  <div>
    <p className="font-medium text-green-700">Student Account</p>
    <p className="text-sm">Email: sagar@gmail.com</p>
    <p className="text-sm">Password: sagar123</p>
  </div>
</div>


			</div>
		</div>
	);
}

export default Login;
