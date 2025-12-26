import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import background from "../assets/background.png"

function Profile() {
  const [user, setUser] = useState({
    name:"",
    email: "",
    role: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    
    setUser({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role")
    });

   
  }, []);

  return (

<div 
  
  className="min-h-screen flex items-center justify-center"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  


     <div className="bg-white rounded-xl px-10 pb-10 pt-5 max-w-4xl">
        <h2 className="justify-center flex font-bold items-center text-5xl text-blue-500 p-2">
          Profile</h2>
          <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-50 h-50 mb-4 bg-transparent rounded-full flex justify-center"/></div>

 <div className="font-bold text-4xl text-gray-600">
        <p className="text-5xl flex justify-center text-red-400 p-1"> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <button onClick={logout} className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-200" >
          Logout
        </button>
      </div>

      </div>
</div>
    
  );
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}



export default Profile;
