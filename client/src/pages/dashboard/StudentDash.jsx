import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { myCourses } from "../../services/coursesServices";
import CourseCard from "../../components/CourseCard";
import { useNavigate } from "react-router";

function StudentDash() {
  const [courseArr, setCourseArr] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Redirect safely
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Load enrolled courses
  useEffect(() => {
    const getMyCourses = async () => {
      try {
        const result = await myCourses(token);
        if (result.data.status === "SUCCESS") {
          setCourseArr(result.data.data || []);
        }
      } catch {
        console.log("Failed to load courses");
      }
    };

    if (token) getMyCourses();
  }, [token]);

  return (
    <div
      className="min-w-full min-h-screen bg-cover bg-fixed bg-no-repeat relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />

      <div className="w-full flex justify-center mt-20 font-bold text-[#155DFC]">
        <h1 className="text-3xl">My Courses</h1>
      </div>

      {courseArr.length === 0 && (
        <div className="w-full flex justify-center text-2xl mt-5">
          <div className="border-2 border-red-100 p-5 bg-red-400 font-semibold text-white rounded-2xl">
            <h1>Not Enrolled to any courses yet</h1>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-8 lg:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courseArr.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            mode="student-dashboard"
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default StudentDash;
