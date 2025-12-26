import React, { createContext } from "react";
import { useState } from "react"
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Landing from "./pages/LandingPage/Landing";
import ViewCourse from "./pages/ViewCourses/ViewCourse"
import AddCourse from "./pages/AddCourse/AddCourse";
import AddVideo from "./pages/AddVideo/AddVideo";
import AdminAllCourses from "./pages/AdminPages/AdminAllCourses";

export const loginContext = createContext()
function App() {
	const [loginStatus, setLoginStatus] = useState(false)
	return (
		<>
			<loginContext.Provider value={{loginStatus, setLoginStatus}}>
				<Routes>
					<Route path="/" element={<Landing/>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register/:course_id" element={<Register />} />
					<Route path="/viewcourse/:course_id" element={<ViewCourse/>} />
					<Route path="/addcourse" element={<AddCourse/> } />
					<Route path="/addvideo/:course_id" element={<AddVideo/> } />
					<Route path="/allcourses" element={<AdminAllCourses/> } />
				</Routes>
			</loginContext.Provider>
		
		<ToastContainer />
		</>
	);
}

export default App;


