import React from 'react'
import bg from '../../assets/background.png'
import Navbar from '../../components/Navbar'

function StudentDash() {
  return (
    <div>
        <div className="wrapper w-full h-screen bg-black" style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover'}}>

            <Navbar/>

        </div>
    </div>
  )
}

export default StudentDash