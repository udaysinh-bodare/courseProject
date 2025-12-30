import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import bg from "../../assets/background.png";
import { toast } from "react-toastify";

import { getAllCourses } from "../../services/coursesServices";
import CourseCard from "../../components/CourseCard";

function AllCourses() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  

  // ---------- FETCH ----------
  async function loadCourses() {
    try {
      const res = await getAllCourses();
      setCourses(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load courses");
    }
  }

  // ---------- ROLE CHECK + LOAD ----------
  useEffect(() => {
    loadCourses().finally(() => setLoading(false));
  }, []);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-blue-500 to-sky-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-white/50 border-t-teal-400 rounded-full animate-spin" />
          <p className="text-white/90 font-medium tracking-wide">
            Loading courses…
          </p>
        </div>
      </div>
    );
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  function toDateObject(dateString) {
    return new Date(dateString);
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <Navbar />

        <div className="px-4 py-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-blue-950">
              All Courses
            </h1>
          </div>

          {!courses.length && (
            <p className="text-center text-gray-600">
              No courses found. Try adding one.
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) =>
              toDateObject(formatDate(course.end_date)) < new Date() ? (
                <div key={course.course_id} className="space-y-2">
                  {/* Admin Mode Card */}
                  <CourseCard course={course} mode="student" />
                </div>
              ) : (
                <div key={course.course_id} className="space-y-2">

                  <div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4 transition-all">
                    <div className="h-[140px] rounded-xl bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
                      <img
                        // src={image}
                        alt={course.course_name}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    </div>

                    <h3 className="font-semibold mt-3">{course.course_name}</h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description || "Course description coming soon."}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      {course.start_date && (
                        <span className="text-xs text-gray-700">
                          📅 {new Date(course.start_date).toLocaleDateString()}
                        </span>
                      )}

                      {course.fees && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">
                          From ₹{course.fees}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 w-full py-2 rounded-xl bg-red-500 text-gray-700 font-semibold text-center text-lg">
                      Expired
                    </div>
                  </div>

                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
