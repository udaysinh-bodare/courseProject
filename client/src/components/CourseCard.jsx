import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCourseImage } from "../services/coursesServices";

function CourseCard({ course, mode = "public" }) {
	const navigate = useNavigate();
	const [image, setImage] = useState("/courseimages/default.jpg");

	// ---------- ROUTING ----------
	const goToCourse = () => {
		if (mode === "admin") {
			navigate(`/allvideos/${course.course_id}`);
		} else if (mode === "student-dashboard") {
			navigate(`/student/allvideos/${course.course_id}`);
		} else {
			navigate(`/viewcourse/${course.course_id}`);
		}
	};

	const goToEdit = () => navigate(`/editcourse/${course.course_id}`);

	// ---------- LOAD IMAGE ----------
	useEffect(() => {
		const fetchImage = async () => {
			try {
				const res = await getCourseImage(course.course_id);
				if (res.status === 200) setImage(res.data.data);
			} catch {
				setImage("/courseimages/default.jpg");
			}
		};
		fetchImage();
	}, [course.course_id]);

	const isExpired = course.end_date && new Date(course.end_date) < new Date();

	const formatDate = (d) => new Date(d).toLocaleDateString("en-GB"); // 30/12/2025

	return (
		<div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4 hover:-translate-y-1 hover:shadow-2xl transition-all">
			{/* IMAGE */}
			<div
				className="h-[140px] rounded-xl overflow-hidden cursor-pointer"
				onClick={goToCourse}
			>
				<img
					src={image}
					alt={course.course_name}
					className="h-full w-full object-cover"
					onError={() => setImage("/courseimages/default.jpg")}
				/>
			</div>

			{/* TITLE + DESC */}
			<h3 className="font-semibold mt-3">{course.course_name}</h3>

			<p className="text-sm text-gray-600 line-clamp-2">
				{course.description || "Course description coming soon."}
			</p>

			{/* META — Start left / End right */}
			<div className="flex justify-between items-center mt-2">
				<span className="text-xs text-gray-700 flex items-center gap-1">
					📅 {formatDate(course.start_date)}
				</span>

				<span className="text-xs text-gray-700 flex items-center gap-1">
					⏳ {formatDate(course.end_date)}
				</span>
			</div>

			{/* ---------- MODE ACTIONS ---------- */}

			{mode === "admin" && (
				<div className="mt-5 flex justify-center">
					<button
						className="w-[90%] py-2 rounded-xl bg-blue-500 text-white font-semibold"
						onClick={(e) => {
							e.stopPropagation();
							goToCourse();
						}}
					>
						Manage Videos
					</button>
				</div>
			)}

			{mode === "student-dashboard" && (
				<button
					className={`mt-5 w-full py-2 rounded-xl font-semibold text-white ${
						isExpired
							? "bg-red-500"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
					onClick={(e) => {
						e.stopPropagation();
						goToCourse();
					}}
				>
					{isExpired ? "Expired" : "▶ Watch Videos"}
				</button>
			)}

			{mode !== "admin" && mode !== "student-dashboard" && (
				<button
					className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold shadow-md"
					onClick={goToCourse}
				>
					View Details
				</button>
			)}
		</div>
	);
}

export default CourseCard;
