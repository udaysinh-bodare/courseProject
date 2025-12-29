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
						{courses.map((course) => (
							<div key={course.course_id} className="space-y-2">
								{/* Admin Mode Card */}
								<CourseCard course={course} mode="student" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllCourses;
