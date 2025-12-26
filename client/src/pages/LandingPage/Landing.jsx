import React, { useState, useEffect } from "react";
import bg from "../../assets/background.png";
import heroImg from "../../assets/hero.png";
import studentsImg from "../../assets/students.png";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router";
import { getAllCourses } from "../../services/coursesServices";

function Landing() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return (
			<div className="h-screen w-full bg-gradient-to-br from-blue-500 to-sky-200 flex items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<div className="w-12 h-12 border-4 border-white/50 border-t-teal-400 rounded-full animate-spin" />
					<p className="text-white/90 font-medium tracking-wide">
						Loading experience…
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

			<div className="relative max-w-7xl mx-auto ">
				{/* NAVBAR */}
				<Navbar />

				{/* HERO */}
				<section className="flex flex-col md:flex-row items-center px-3 pt-6 gap-3">
					<div className="md:w-1/2 flex flex-col gap-1">
						<h1 className="text-4xl font-semibold text-blue-950 leading-tight">
							Upgrade Your Skills <br /> With Our Training
							Programs
						</h1>

						<p className="text-lg text-blue-900/90">
							Professional courses with live mentoring <br />
							and real-world projects.
						</p>

						<div className="flex gap-4 mt-1">
							<button
								className="px-7 py-3 rounded-full font-semibold text-white
                bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg
                hover:shadow-emerald-400/60 hover:-translate-y-0.5 transition-all"
							>
								Enroll Now
							</button>

							<button
								className="px-7 py-3 rounded-full font-semibold
                bg-white/80 backdrop-blur border shadow-md
                hover:-translate-y-0.5 hover:shadow-lg transition-all"
							>
								View Courses
							</button>
						</div>
					</div>

					<div className="md:w-1/2 flex justify-center">
						<img
							src={heroImg}
							alt="Training Illustration"
							className="w-[620px] max-w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
						/>
					</div>
				</section>

				{/* STATS */}
				<section className="flex flex-wrap justify-center gap-6 mt-10 px-10">
					{[
						{ v: "10,000+", l: "Students Trained", icon: "🎓" },
						{ v: "120+", l: "Courses", icon: "📘" },
						{ v: "50+", l: "Certified Trainers", icon: "🥇" },
						{ v: "98%", l: "Success Rate", icon: "🏆" },
					].map((i) => (
						<div
							key={i.l}
							className="bg-white/85 backdrop-blur-lg shadow-xl rounded-2xl border border-white/50
                         px-6 py-4 w-[180px] text-center
                         hover:-translate-y-1 hover:shadow-2xl transition-all"
						>
							<div className="text-3xl">{i.icon}</div>
							<h2 className="text-xl font-bold">{i.v}</h2>
							<p className="text-sm text-gray-600">{i.l}</p>
						</div>
					))}
				</section>

				{/* LIVE COURSES — CAROUSEL */}
				<section className="mt-12 px-6">
					<h2 className="text-2xl font-semibold text-center mb-6">
						Live Courses
					</h2>

					<CourseCarousel />
				</section>

				{/* WHY CHOOSE US */}
				<section className="mt-16 px-5 pb-16">
					<div
						className="bg-white/85 backdrop-blur-lg shadow-xl rounded-3xl p-8
                          flex flex-col md:flex-row gap-6 border border-white/50"
					>
						<div className="md:w-1/2">
							<h2 className="text-2xl font-semibold mb-4">
								Why Choose Us
							</h2>

							<ul className="space-y-2 text-gray-700">
								<li>✔ Industry-oriented curriculum</li>
								<li>✔ Hands-on project experience</li>
								<li>✔ Placement assistance</li>
								<li>✔ Certificates of completion</li>
							</ul>

							<button
								className="mt-6 px-6 py-3 rounded-full font-semibold
                bg-gradient-to-r from-emerald-400 to-teal-500
                text-white shadow-lg hover:shadow-emerald-400/60 transition-all"
							>
								Get Started
							</button>
						</div>

						<div className="md:w-1/2 flex justify-center">
							<img
								src={studentsImg}
								alt="Students"
								className="rounded-2xl w-full max-w-[460px] drop-shadow-lg"
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

async function getallcoursesforcarousel() {
	let courses = await getAllCourses();

	return courses.data;
}

function CourseCarousel() {
	const navigate = useNavigate();

	const [courses, setCourses] = useState([]);
	const [paused, setPaused] = useState(false);

	const trackRef = React.useRef(null);
	const posRef = React.useRef(0);

	const fallbackCourses = [
		{
			course_id: 1,
			course_name: "Full-Stack MERN Development",
			description:
				"Learn MongoDB, Express, React and Node with real projects.",
			fees: 12999,
			start_date: "2025-02-10",
		},
		{
			course_id: 2,
			course_name: "Data Science & Machine Learning",
			description: "Hands-on Python, Pandas, ML models and datasets.",
			fees: 14999,
			start_date: "2025-03-01",
		},
		{
			course_id: 3,
			course_name: "UI / UX Design Fundamentals",
			description: "Figma, wireframing, user research and portfolios.",
			fees: 10999,
			start_date: "2025-02-15",
		},
	];

	// Fetch courses
	useEffect(() => {
		async function load() {
			try {
				const res = await getAllCourses();
				const data = res?.data.data;

				if (Array.isArray(data) && data.length > 0) {
					setCourses(data);
				} else {
					setCourses(fallbackCourses);
				}
			} catch (e) {
				console.error("API failed — using fallback", e);
				console.log(e);
				setCourses(fallbackCourses);
			}
		}

		load();
	}, []);

	const goToCourse = (course_id) => {
		navigate(`/viewcourse/${course_id}`);
	};

	const getCardsPerView = () =>
		typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;

	const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

	useEffect(() => {
		const handler = () => setCardsPerView(getCardsPerView());
		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, []);

	const minItems = cardsPerView * 2;
	const base = courses.length ? courses : fallbackCourses;

	const filled =
		base.length >= minItems
			? base
			: Array.from({ length: minItems }, (_, i) => base[i % base.length]);

	const looped = [...filled, ...filled];

	const speed = 2;

	// autoplay
	useEffect(() => {
		let frame;

		const animate = () => {
			if (!paused && trackRef.current) {
				posRef.current -= speed;

				const track = trackRef.current;
				const width = track.scrollWidth / 2;

				if (Math.abs(posRef.current) >= width) {
					posRef.current = 0;
				}

				track.style.transform = `translateX(${posRef.current}px)`;
			}

			frame = requestAnimationFrame(animate);
		};

		frame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frame);
	}, [paused, courses]);

	return (
		<div
			className="relative max-w-6xl mx-auto overflow-hidden"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<div ref={trackRef} className="flex gap-6 will-change-transform">
				{/* Render skeleton while loading */}
				{!courses.length && (
					<p className="text-gray-500 px-3">Loading courses…</p>
				)}

				{looped.map((c, i) => (
					<div
						key={i}
						className="flex-none px-3"
						style={{ width: `${100 / cardsPerView}%` }}
					>
						<div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4 hover:-translate-y-1 hover:shadow-2xl transition-all">
							<div className="h-[140px] rounded-xl bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
								<span className="text-3xl text-blue-500">
									📘
								</span>
							</div>

							<h3 className="font-semibold mt-3">
								{c.course_name}
							</h3>

							<p className="text-sm text-gray-600 line-clamp-2">
								{c.description ||
									"Course description coming soon."}
							</p>

							<div className="flex justify-between items-center mt-2">
								{c.start_date && (
									<span className="text-xs text-gray-700">
										📅{" "}
										{new Date(
											c.start_date
										).toLocaleDateString()}
									</span>
								)}

								{c.fees && (
									<span className="text-xs font-semibold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700">
										From ₹{c.fees}
									</span>
								)}
							</div>

							<button
								className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold shadow-md"
								onClick={() => goToCourse(c.course_id)}
							>
								View Details
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Landing;
