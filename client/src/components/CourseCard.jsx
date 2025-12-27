import React from "react";
import { useNavigate } from "react-router";

function CourseCard({ course, mode = "student" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (mode === "admin") {
      navigate(`/allvideos/${course.course_id}`);
    } else {
      navigate(`/viewcourse/${course.course_id}`);
    }
  };

  return (
    <div
      className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4
      hover:-translate-y-1 hover:shadow-2xl transition-all cursor-pointer"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="h-[140px] rounded-xl bg-gradient-to-br from-sky-100 to-blue-200
                      flex items-center justify-center">
        <span className="text-3xl text-blue-500">📘</span>
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
          <span className="text-xs font-semibold px-2 py-1 rounded-lg
                           bg-emerald-100 text-emerald-700">
            From ₹{course.fees}
          </span>
        )}
      </div>

      <button
        className="mt-3 w-full py-2 rounded-xl
                   bg-gradient-to-r from-teal-400 to-green-500
                   text-white font-semibold shadow-md"
      >
        {mode === "admin" ? "Manage Videos" : "View Details"}
      </button>
    </div>
  );
}

export default CourseCard;
