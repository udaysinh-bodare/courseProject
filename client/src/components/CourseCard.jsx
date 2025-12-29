import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCourseImage } from "../services/coursesServices";

function CourseCard({ course, mode = "student" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    mode === "admin"
      ? navigate(`/allvideos/${course.course_id}`)
      : navigate(`/viewcourse/${course.course_id}`);
  };

  const goToEditCourse = () =>
    navigate(`/editcourse/${course.course_id}`);

  const [image, setImage] = useState(
     "/courseimages/default.jpg"
  );

  useEffect(() => {
	const fetchImage = async () => {
			  try {
				const respones = await getCourseImage(course.course_id);
				if (respones.status === 200) {
					setImage(respones.data.data);
				}
			  } catch (error) {
				setImage("/courseimages/default.jpg");
				console.error("Error fetching course image:", error);
			  }
	};
	fetchImage();
  }, [course.course_id]);

  return (
    <div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4 hover:-translate-y-1 hover:shadow-2xl transition-all">
      
      <div
        className="h-[140px] rounded-xl bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={image}
          alt={course.course_name}
          className="h-full w-full object-cover rounded-xl"
          onError={() => setImage()}
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

      {mode === "admin" ? (
        <div className="mt-3 flex gap-2">
          <button
            className="w-1/2 py-2 rounded-xl bg-blue-500 text-white font-semibold"
            onClick={handleClick}
          >
            Manage Videos
          </button>

            <button
              className="w-1/2 py-2 rounded-xl bg-amber-500 text-white font-semibold"
              onClick={goToEditCourse}
            >
              Edit Course
            </button>
        </div>
      ) : (
        <button
          className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold shadow-md"
          onClick={handleClick}
        >
          View Details
        </button>
      )}
    </div>
  );
}

export default CourseCard;
