import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router';
import ViewCourse from './../pages/ViewCourses/ViewCourse';
import AllCourses from './../pages/Courses/AllCourses';
import AboutUs from '../pages/extra/AboutUs';
import ContactUs from './../pages/extra/ContactUs';


function Footer() {


  return (
    <footer className='bg-gray-100 text-black mt-10'>
        <div className='max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div>
                 <h2 className="text-xl font-bold text-blue-500">🏠 Skill Katta</h2>

                 <div className='pt-5'>
                    <ul className="space-y-1 text-gray-900">
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/about">About Us</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/contact">Contact Us</Link></li>
            </ul>
                 </div>
               
            </div>
            <div>
          <h3 className="font-semibold mb-2">Courses</h3>
          <ul className="space-y-1 text-gray-900">
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/student/allcourses">All Courses</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><Link> Enroll me</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/privacy">Privacy Policy</Link></li>

          </ul>
        </div>
         <div>
          <h3 className="font-semibold mb-2">Resourses</h3>
          <ul className="space-y-1 text-gray-900">
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/student/allcourses">All courses</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/login">Login</Link></li>
            <li className="hover:text-blue-400 cursor-pointer"><Link to="/student/dashboard">Dashboard</Link></li>
            
          </ul>
        </div>
        <div>
         
          <h1 className='font-bold'>Follow Us</h1>
            <div className="icons flex gap-2 mt-4">
                <i className="text-xl fa-brands fa-facebook"></i>
                <i className="text-xl fa-brands fa-x-twitter"></i>
                <i className="text-xl fa-brands fa-linkedin"></i>
            </div>
          <div className='pt-5'>
            <div className="border-t border-gray-700 text-center py-3 text-sm text-gray-400">
        © {new Date().getFullYear()} Skill Katta. All rights reserved.
      </div>
          </div>
        </div>
        
        
        </div>

    </footer>
  )
}

export default Footer
