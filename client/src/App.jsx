import React, { createContext } from "react";
import { useState } from "react"
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Landing from "./pages/LandingPage/Landing";




export const loginContext = createContext()
function App() {
	const [loginStatus, setLoginStatus] = useState(false)
	return (
		<>
			<loginContext.Provider value={{loginStatus, setLoginStatus}}>
				<Routes>
					<Route path="/" element={<Landing/>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</loginContext.Provider>
		
		<ToastContainer />
		</>
	);
}

export default App;


