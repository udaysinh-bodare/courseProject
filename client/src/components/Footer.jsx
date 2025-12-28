import React from 'react'
import { useContext } from 'react';

function Footer() {


  return (
    <footer className='bg-gray-100 text-black mt-10'>
        <div className='max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div>
                 <h2 className="text-xl font-bold text-blue-500">🏠 Skill Katta</h2>

                 <div className='pt-5'>
                    <ul className="space-y-1 text-gray-900">
            <li className="hover:text-blue-400 cursor-pointer">About Us</li>
            <li className="hover:text-blue-400 cursor-pointer">contact Us</li>
            </ul>
                 </div>
               
            </div>
            <div>
          <h3 className="font-semibold mb-2">Courses</h3>
          <ul className="space-y-1 text-gray-900">
            <li className="hover:text-blue-400 cursor-pointer">All courses</li>
            <li className="hover:text-blue-400 cursor-pointer">Enroll now</li>
            <li className="hover:text-blue-400 cursor-pointer">privacy policy</li>
            
          </ul>
        </div>
         <div>
          <h3 className="font-semibold mb-2">Resourses</h3>
          <ul className="space-y-1 text-gray-900">
            <li className="hover:text-blue-400 cursor-pointer">All courses</li>
            <li className="hover:text-blue-400 cursor-pointer">Blog</li>
            <li className="hover:text-blue-400 cursor-pointer">FAQ</li>
            
          </ul>
        </div>
        <div>
          {/* <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-600 text-sm">Email: support@sunbeam.com</p> */}
          {/* <p className="text-gray-600 text-sm">Phone: +91 9876543210</p> */}
          <h1 className='font-bold'>Follow Us</h1>
            <div className="icons flex gap-2 mt-4">
                <i className="text-xl fa-brands fa-facebook"></i>
                <i className="text-xl fa-brands fa-x-twitter"></i>
                <i className="text-xl fa-brands fa-linkedin"></i>
            </div>
          <div className='pt-5'>
            <div className="border-t border-gray-700 text-center py-3 text-sm text-gray-400">
        © {new Date().getFullYear()} Sunbeam Project. All rights reserved.
      </div>
          </div>
        </div>
        
        
        </div>

    </footer>
  )
}

export default Footer
