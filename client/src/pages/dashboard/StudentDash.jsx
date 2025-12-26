import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { myCourses } from "../../services/coursesServices";

function StudentDash() {
    const [courseArr, setCourseArr] = useState([]);
    const token = localStorage.getItem("token");

  const getMyCourses = async () => {
    const result = await myCourses(token);
    console.log(result);
    console.log(result.data);
    console.log(result.data.data);
    
    if (result.data.status === "SUCCESS") {
      setCourseArr(result.data.data); 
    }
  };

  useEffect(() => {
      getMyCourses();
    }, []);
    
  return (
    <div
      className="wrapper w-full h-screen bg-black"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <Navbar />

      <div className="title w-full flex justify-center mt-20 font-bold text-[#155DFC]">
        <h1 className="text-3xl">My Courses</h1>
      </div>

      <div className="courses w-full">
        
      </div>
    </div>
  );
}

export default StudentDash;
