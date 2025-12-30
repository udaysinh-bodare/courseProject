import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { myCourses } from "../../services/coursesServices";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer";

function StudentDash() {
  const navigate = useNavigate();
  const [courseArr, setCourseArr] = useState([]);
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  const getMyCourses = async () => {
    try {
      const result = await myCourses(token);
      console.log(result.data);
      
      if (result.data.status === "SUCCESS") {
        setCourseArr(result.data.data);
      }
    } catch {
      console.log("Failed to load courses");
    }
  };

 

  useEffect(() => {
    getMyCourses();

    
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  function toDateObject(dateString) {
    return new Date(dateString);
  }



  // console.log(courseArr[0].start_date);
  
  // const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="min-w-full min-h-screen bg-cover bg-fixed bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <Navbar />

      <div className="title w-full flex justify-center mt-20 font-bold text-[#155DFC]">
        <h1 className="text-3xl">My Courses</h1>
      </div>

      <div
        className="main w-full px-4 sm:px-8 lg:px-20 py-10
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {courseArr.map((elem, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/student/allvideos/${elem.course_id}`)
            }
            className="card bg-white/20 p-6 rounded-2xl shadow-lg
            hover:scale-105 transition-transform cursor-pointer
            flex flex-col gap-3 min-w-[300px]"
          >
            <div className="pic w-full h-[180px] bg-gradient-to-br from-sky-300 to-blue-200 rounded-lg flex justify-center items-center">
              <span className="text-3xl text-blue-500">📘</span>
            </div>

            <h1 className="text-xl font-bold">
              {elem.course_name}
            </h1>


            <h3 className="text-md font-semibold">
              Start Date: {formatDate(elem.start_date)}
            </h3>

            <h3 className="text-md font-semibold">
              End Date: {formatDate(elem.end_date)}
            </h3>

            
            
            {(toDateObject(elem.end_date) < new Date()) ?   (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // avoid double navigation
                  navigate(`/student/allvideos/${elem.course_id}`);
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold"
              >
                Expired
              </button>
              ): (
                <button
                onClick={(e) => {
                  e.stopPropagation(); // avoid double navigation
                  navigate(`/student/allvideos/${elem.course_id}`);
                }}
                className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer"
              >
                ▶ Watch Videos
              </button>
              )

            }

          </div>

        ))}
      </div>

        

    </div>
  );
}

export default StudentDash;
