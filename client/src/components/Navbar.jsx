import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  // Auth status from token
  const isLoggedIn = !!localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  return (
    // ✅ z-50 ensures dropdown is ABOVE page content
    <nav className="relative z-50 mx-auto w-[90%] pt-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between rounded-full px-6 py-2
                      bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">

        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold text-blue-600">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            🏠
          </div>
          Skill Katta
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>

          {/* Courses Dropdown */}
          {/* ✅ relative + overflow-visible is IMPORTANT */}
          <div className="relative group overflow-visible">
            <span className="nav-link cursor-pointer flex items-center gap-1">
              Courses <span>▾</span>
            </span>

            {/* Dropdown */}
            <div className="absolute left-0 top-full mt-2 w-40 rounded-lg bg-white shadow-lg
                            opacity-0 invisible group-hover:opacity-100
                            group-hover:visible transition-all duration-200">
              <Link
                to="/student/dashboard"
                className="block px-4 py-2 hover:bg-blue-100 rounded-t-lg"
              >
                My Courses
              </Link>
              <Link
                to="/student/allcourses"
                className="block px-4 py-2 hover:bg-blue-100 rounded-b-lg"
              >
                All Courses
              </Link>
            </div>
          </div>

          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>

        {/* Desktop Right Side */}
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
                         bg-gradient-to-r from-blue-500 to-cyan-500 text-white
                         transition-all duration-300
                         hover:scale-110 hover:shadow-lg"
              title="Profile"
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
                  d="M15.75 7.5a3.75 3.75 0 11-7.5 0
                     3.75 3.75 0 017.5 0zM4.5 20.25
                     a7.5 7.5 0 0115 0"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-white"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 rounded-xl bg-white shadow-lg p-4 space-y-4">
          <Link onClick={() => setOpen(false)} to="/" className="mobile-link">
            Home
          </Link>

          {/* Mobile Courses Dropdown */}
          <div>
            <button
              onClick={() => setCourseOpen(!courseOpen)}
              className="mobile-link flex justify-between w-full"
            >
              Courses
              <span>{courseOpen ? "▲" : "▼"}</span>
            </button>

            {courseOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link
                  onClick={() => {
                    setOpen(false);
                    setCourseOpen(false);
                  }}
                  to="/student/dashboard"
                  className="block text-sm text-gray-700"
                >
                  My Courses
                </Link>

                <Link
                  onClick={() => {
                    setOpen(false);
                    setCourseOpen(false);
                  }}
                  to="/student/allcourses"
                  className="block text-sm text-gray-700"
                >
                  All Courses
                </Link>
              </div>
            )}
          </div>

          <Link onClick={() => setOpen(false)} to="/about" className="mobile-link">
            About Us
          </Link>

          <Link onClick={() => setOpen(false)} to="/contact" className="mobile-link">
            Contact Us
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
              className="rounded-full bg-blue-500 px-5 py-2 text-white"
            >
              Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
