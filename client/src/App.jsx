import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Landing from "./pages/LandingPage/Landing";
// import { ToastContainer } from "react-toastify";

import { useState } from "react"
import { ToastContainer } from "react-toastify";



function App() {
	const [loginStatus, setLoginStatus] = useState(false)
	return (
		<>
		
			<Routes>
				<Route path="/" element={<Landing/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		
		<ToastContainer />
		</>
	);
}

export default App;
