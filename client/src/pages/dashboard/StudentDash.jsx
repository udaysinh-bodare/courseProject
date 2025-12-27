import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { myCourses } from "../../services/coursesServices";
import CourseCard from "../../components/CourseCard";
import { useNavigate } from "react-router";

import { Card } from "flowbite-react";

function StudentDash() {
  const navigate = useNavigate();
  const [courseArr, setCourseArr] = useState([]);
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
  const getMyCourses = async () => {
    const result = await myCourses(token);

    if (result.data.status === "SUCCESS") {
      setCourseArr(result.data.data);
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  console.log(courseArr);

  return (
    <div
      className="min-w-full min-h-screen bg-cover bg-fixed bg-no-repeat relative"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" , backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "left"}}
    >
      <Navbar />

      <div className="title w-full flex justify-center mt-20 font-bold text-[#155DFC]">
        <h1 className="text-3xl block">My Courses</h1>
      </div>

      <div
        className="main w-full px-4 sm:px-8 lg:px-20 py-10 
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {courseArr.map((elem, index) => {
          return (
            <div
              key={index}
              className="card bg-white/20 p-6 rounded-2xl shadow-lg shadow-[2px_2px_2px_2px]
                   flex flex-col gap-3 hover:scale-105 transition-transform min-w-[300px]"
              style={{cursor: "pointer"}}
            >
              <div className="pic w-full h-[180px] bg-gradient-to-br from-sky-300 to-blue-200 rounded-lg flex justify-center items-center">
                <span class="text-3xl text-blue-500">📘</span>
              </div>

              <h1 className="text-lg font-bold">
                Course Name: {elem.course_name}
              </h1>

              <p className="desc text-sm text-gray-900 font-semibold">{elem.description}</p>

              <h3 className="text-sm font-semibold">Start Date: {elem.start_date}</h3>

              <h3 className="text-sm font-semibold">End Date: {elem.end_date}</h3>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentDash;
