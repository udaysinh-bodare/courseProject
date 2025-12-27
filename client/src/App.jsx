import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Landing from "./pages/LandingPage/Landing";
import ViewCourse from "./pages/ViewCourses/ViewCourse";
import Profile from "./pages/Auth/Profile";
import AddCourse from "./pages/AddCourse/AddCourse";
import StudentDash from "./pages/dashboard/StudentDash";
import ChangePassword from "./pages/Auth/ChangePassword";
import AdminAllCourses from "./pages/AdminPages/AdminAllCourses";
import AddVideo from "./pages/AddVideo/AddVideo";
import AdminAllVideos from "./pages/AdminPages/AdminAllVideos";

/* ================= PROTECTED ROUTE ================= */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* ================= APP ================= */
function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:course_id" element={<Register />} />
        <Route path="/viewcourse" element={<ViewCourse />} />
        <Route path="/viewcourse/:course_id" element={<ViewCourse />} />

        {/* Protected Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/changepassword"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addcourse"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addvideo/:course_id"
          element={
            <ProtectedRoute>
              <AddVideo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allcourses"
          element={
            <ProtectedRoute>
              <AdminAllCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/allvideos/:course_id"
          element={
            <ProtectedRoute>
              <AdminAllVideos />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
