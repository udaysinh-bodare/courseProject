import React from 'react'
import { Link, Links } from 'react-router'
import Register from './Register'

function Login() {
  return (
    <div>
        <div className="wrapper h-screen w-full  bg-gradient-to-br from-blue-600 to-white flex justify-center items-center px-4">
            <div className="login-box bg-white/20 w-[25%]  backdrop-blur-md  rounded-xl   border border-white/30   px-6 py-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                <h1 className='text-3xl text-center mb-10 font-semibold  py-2'>Login</h1>

                <form>
                    <div className="email-box flex flex-col mb-10">
                        <label htmlFor="email" className='text-xl mb-2 ml-1 font-semibold' >Email</label>
                        <input type="text" className='bg-gray-100 rounded-md p-1.5' placeholder='Enter Email' />
                    </div>

                    <div className="pass-box flex flex-col mb-10">
                        <label htmlFor="password" className='text-xl mb-2 ml-1 font-semibold'>Password</label>
                        <input type="password" className='bg-gray-100 rounded-md p-1.5' placeholder='Enter Password' />
                    </div>

                    <div className="btn w-full flex justify-center">
                        <button className='text-xl border border-green-400 bg-green-400 hover:opacity-[.5] cursor-pointer p-2 rounded-3xl text-white font-semibold px-4 text-center'>Login</button>
                    </div>

                    <div className="mess mt-5 mb-5 text-center">
                        Don't have an account?<Link  className='text-blue-700 border-b-blue-700 no-underline hover:underline' to='/'> SignUp</Link>
                    </div>

                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login