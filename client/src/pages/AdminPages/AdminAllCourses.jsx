import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import bg from "../../assets/background.png";
import { toast } from "react-toastify";

import { getAuthUser } from "../../utils/auth";
import { getAllCourses } from "../../services/coursesServices";
import CourseCard from "../../components/CourseCard";

function AdminAllCourses() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // ---------- ROLE CHECK + FETCH DATA ----------
  useEffect(() => {
    async function init() {
      const user = getAuthUser();

      if (!user) {
        toast.error("Please login first");
        return navigate("/login");
      }

      if (user.role !== "admin") {
        toast.error("Access denied — admin only");
        return navigate("/");
      }

      try {
        const res = await getAllCourses();
        setCourses(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const openCourse = (id) => navigate(`/viewcourse/${id}`);

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

  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <Navbar />

        <div className="px-4 py-10">
          <h1 className="text-3xl font-semibold text-blue-950 text-center mb-6">
            All Courses (Admin)
          </h1>

          {/* Empty state */}
          {!courses.length && (
            <p className="text-center text-gray-600">
              No courses found. Try adding one.
            </p>
          )}

          {/* Grid of courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.course_id}
                onClick={() => openCourse(course.course_id)}
                className="cursor-pointer"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAllCourses;
