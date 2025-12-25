import React from 'react'
import { Link, useNavigate } from 'react-router'
import { loginContext } from '../App';  

function Navbar() {
  const navigate = useNavigate();
  const {loginStatus} = React.useContext(loginContext);

  return (


    <div>
      <nav className=" mx-auto  w-[90%] max-w-full pt-2">
        <div className="flex items-center justify-between rounded-full px-8 py-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">



          <div className="flex items-center gap-2 text-xl font-semibold text-blue-600">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white ">
              🏠
            </div>
            Skill Katta
          </div>


          <div className="flex items-center gap-6">

            <Link
              to="/"
              className="text-black text-md hover:text-blue-800 hover:underline decoration-black underline-offset-4"
            >
              Home
            </Link>


            <div className="relative group">

              <span className="cursor-pointer text-black hover:text-blue-800 hover:underline decoration-black underline-offset-4 text-md flex items-center gap-1">
                Courses
                <span className="text-sm ">▾</span>
              </span>

              <div className="absolute left-0 top-full mt-2 w-40 rounded-lg bg-white shadow-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 ">

                <Link to="/my-courses" className="block px-4 py-2 hover:bg-blue-100">My Courses</Link>
                <Link to="/courses" className="block px-4 py-2 hover:bg-blue-100"> All Courses</Link>
              </div>

            </div>

            <Link to="/about" className="text-black hover:text-blue-800 text-md hover:underline decoration-black underline-offset-4">About Us</Link>
            <Link to="/contact" className="text-black hover:text-blue-800 text-md hover:underline decoration-black underline-offset-4">Contact Us</Link>
          </div>


          <div className="flex items-center gap-3">
            {!loginStatus && (
              <button className="rounded-full bg-green-500 px-5 py-2 text-white hover:bg-green-600" onClick={() => navigate('/login')}>Login</button>
            )}

            {loginStatus && (
              <button className="flex items-center justify-center rounded-full p-3 text-white shadow-md bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
                </svg>
              </button>
            )}


          </div>


        </div>
      </nav>
    </div>
  )
}

export default Navbar
