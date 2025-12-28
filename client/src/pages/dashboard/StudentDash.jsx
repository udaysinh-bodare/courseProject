import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { myCourses } from "../../services/coursesServices";
import { useNavigate } from "react-router";

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
      if (result.data.status === "SUCCESS") {
        setCourseArr(result.data.data);
      }
    } catch {
      console.log("Failed to load courses");
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  useEffect(() => {
    getMyCourses();
  }, []);


  console.log(courseArr);
  

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

            <button
              onClick={(e) => {
                e.stopPropagation(); // avoid double navigation
                navigate(`/student/allvideos/${elem.course_id}`);
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer"
            >
              ▶ Watch Videos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDash;
