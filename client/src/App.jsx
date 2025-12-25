import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Landing from "./pages/LandingPage/Landing";
import { LoginContext } from "./context/AppContext"


import { useState } from "react"



function App() {
	const [loginStatus, setLoginStatus] = useState(false)
	return (
		<>
		<LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
			<Routes>
				<Route path="/" element={<Landing/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</LoginContext.Provider>
		<ToastContainer />
		</>
	);
}

export default App;
