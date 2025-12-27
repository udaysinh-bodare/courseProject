import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function AdminNavbar() {
  const navigate = useNavigate();

  
  const isLoggedIn = !!localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  return (
    <nav className="mx-auto w-[90%] pt-2">
      
      <div
        className="flex items-center justify-between rounded-full px-6 py-2
                   bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
      >
       
        <div className="flex items-center gap-2 text-xl font-semibold text-purple-600">
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
            🛠
          </div>
          Admin Panel
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/allcourses" className="nav-link">
            Courses
          </Link>

          <Link to="/students" className="nav-link">
            Students
          </Link>
        </div>

        
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-green-500 px-5 py-2 text-white
                         transition-all duration-300
                         hover:bg-green-600 hover:scale-105 hover:shadow-md"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center justify-center rounded-full p-3
                         bg-gradient-to-r from-purple-500 to-pink-500 text-white
                         transition-all duration-300
                         hover:scale-110 hover:shadow-lg"
              title="Admin Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
                />
              </svg>
            </button>
          )}
        </div>

   
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-white"
        >
          ☰
        </button>
      </div>

     
      {open && (
        <div className="md:hidden mt-3 rounded-xl bg-white shadow-lg p-4 space-y-4">
          <Link
            onClick={() => setOpen(false)}
            to="/allcourses"
            className="mobile-link"
          >
            Courses
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/students"
            className="mobile-link"
          >
            Students
          </Link>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className="rounded-full bg-green-500 px-5 py-2 text-white"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="rounded-full bg-purple-500 px-5 py-2 text-white"
            >
              Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default AdminNavbar;
