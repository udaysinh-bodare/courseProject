import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import bg from "../../assets/background.png";
import { toast } from "react-toastify";

import { getAuthUser } from "../../utils/auth";
import { getAllCourses, deleteCourse } from "../../services/coursesServices";
import CourseCard from "../../components/CourseCard";

function AdminAllCourses() {
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
    const user = getAuthUser();

    if (!user) {
      toast.error("Please login first");
      return navigate("/login");
    }

    if (user.role !== "admin") {
      toast.error("Access denied — admin only");
      return navigate("/");
    }

    loadCourses().finally(() => setLoading(false));
  }, []);

  const openCourse = (id) => navigate(`/allvideos/${id}`);

  // ---------- DELETE COURSE ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully");
      loadCourses(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-blue-950">
              All Courses (Admin)
            </h1>

            <button
              onClick={() => navigate("/addcourse")}
              className="px-6 py-2 rounded-full font-semibold text-white
                bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg"
            >
              ➕ Add Course
            </button>
          </div>

          {!courses.length && (
            <p className="text-center text-gray-600">
              No courses found. Try adding one.
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.course_id} className="space-y-2">
                {/* Card (clickable) */}
                <div
                  onClick={() => openCourse(course.course_id)}
                  className="cursor-pointer"
                >
                  <CourseCard course={course} />
                </div>

                {/* Action Row */}
                <div className="flex justify-end gap-3 mt-1">
                  <button
				  	onClick={()=>navigate(`/editcourse/${course.course_id}`)}
                    className="px-4 py-1.5 rounded-full text-lg
          bg-white text-white shadow hover:bg-blue-600"
                  >
                    📝
                  </button>

                  <button
                    onClick={() => navigate(`/addvideo/${course.course_id}`)}
                    className="px-4 py-1.5 rounded-full text-sm
          bg-white text-white shadow hover:bg-blue-600"
                  >
                    ➕ 
                  </button>

                  <button
                    onClick={() => handleDelete(course.course_id)}
                    className="px-4 py-1.5 rounded-full text-sm
          bg-red-500 text-white shadow hover:bg-red-600"
                  >
                    🗑 
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAllCourses;
