import { useLocation } from "react-router";
import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import coursebg from "../../assets/coursebg.png";
import { getCourseDetails } from "../../services/coursesServices";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router"; 

function ViewCourse() {
  const navigate = useNavigate();
  const { course_id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await getCourseDetails(course_id);
        setCourseDetails(response.data);
        console.log("Course Details:", response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourseDetails();
  }
    , [course_id]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-linear-to-br from-blue-500 to-sky-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-white/50 border-t-teal-400 rounded-full animate-spin" />
          <p className="text-white/90 font-medium tracking-wide">
            Loading experience…
          </p>
        </div>
      </div>
    );
  }
  if (!courseDetails) {
    return <div>No course details available.</div>;
  }
  
  function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

  return (

  <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Glassmorphism Course Card */}
      <div
        className="w-[80%] mt-10 
        bg-white/30 backdrop-blur-xl 
        border border-white/30 
        rounded-2xl shadow-2xl 
        p-8 flex flex-col md:flex-row gap-10"
      >
        {/* LEFT SIDE – Course Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {courseDetails.data[0].course_name}
            {/* console.log(courseDetails); */}
          </h1>

          <p className="text-slate-700 mb-6 leading-relaxed">
            {courseDetails.data[0].description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/30">
              <p className="text-sm text-slate-600">Start Date</p>
              <p className="font-semibold"> {formatDate(courseDetails.data[0].start_date)}</p>
            </div>

            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/30">
              <p className="text-sm text-slate-600">End Date</p>
              <p className="font-semibold"> {formatDate(courseDetails.data[0].end_date)}</p>
            </div>

          </div>
          
            <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/30 sm:col-span-2 ml-30 mr-30">
              <p className="text-sm text-slate-600">Fees</p>
              <p className="font-semibold text-green-600 text-lg">
                ₹ {courseDetails.data[0].fees}
              </p>
            </div>

          {/* Centered Enroll Button */}
          <div className="flex justify-center mt-8">
            <button
              className="px-10 py-3 
              bg-green-500/90 backdrop-blur-md 
              text-white font-semibold 
              rounded-full shadow-lg 
              hover:bg-green-600 hover:scale-105 
              transition-all" 
            onClick={() => navigate(`/register/${courseDetails.data[0].course_id}`)}
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE – IMAGE */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={coursebg}
            alt="Course Illustration"
            className="max-w-900 w-full"
          />
        </div>
      </div>
    </div>



  );
}

export default ViewCourse;
