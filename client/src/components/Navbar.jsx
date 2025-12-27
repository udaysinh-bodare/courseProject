import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { loginContext } from "../App";

function Navbar() {
  const navigate = useNavigate();
  const { loginStatus } = useContext(loginContext);
  const [open, setOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  return (
    <nav className="mx-auto w-[90%] pt-2">
      {/* Top Bar */}
      <div className="flex items-center justify-between rounded-full px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">

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

          {/* Courses Dropdown (Desktop) */}
          <div className="relative group">
            <span className="nav-link cursor-pointer flex items-center gap-1">
              Courses <span>▾</span>
            </span>

            <div className="absolute left-0 top-full mt-2 w-40 rounded-lg bg-white shadow-lg
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link to="/my-courses" className="block px-4 py-2 hover:bg-blue-100">
                My Courses
              </Link>
              <Link to="/courses" className="block px-4 py-2 hover:bg-blue-100">
                All Courses
              </Link>
            </div>
          </div>

          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!loginStatus ? (
            <button
              onClick={() => navigate("/login")}
              className="rounded-full bg-green-500 px-5 py-2 text-white"
            >
              Login
            </button>
          ) : (
            <button className="rounded-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              👤
            </button>
          )}
        </div>

        {/* Hamburger */}
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

          {/* Courses Dropdown (Mobile) */}
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
                  to="/my-courses"
                  className="block text-sm text-gray-700"
                >
                  My Courses
                </Link>

                <Link
                  onClick={() => {
                    setOpen(false);
                    setCourseOpen(false);
                  }}
                  to="/courses"
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

          {!loginStatus ? (
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
            <button className="rounded-full bg-blue-500 px-5 py-2 text-white">
              Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
