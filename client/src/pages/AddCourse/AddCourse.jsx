import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { addCourse, uploadImage } from "../../services/coursesServices";
import { getAuthUser } from "../../utils/auth";
import { toast } from "react-toastify";

function AddCourse() {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [image, setImage] = useState(null);

	const [imageFile, setImageFile] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setImage(URL.createObjectURL(file));
		setImageFile(file);
	};

	useEffect(() => {
		const user = getAuthUser();

		if (!user) {
			toast.error("Please login first");
			navigate("/login");
			return;
		}

		if (user.role !== "admin") {
			toast.error("Access denied — admin only");
			navigate("/");
			return;
		}

		setLoading(false);
	}, []);

	const [form, setForm] = useState({
		course_name: "",
		description: "",
		fees: "",
		start_date: "",
		end_date: "",
		video_expire_days: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const validate = () => {
		const errs = {};

		if (!form.course_name.trim())
			errs.course_name = "Course name is required";

		if (!form.description.trim())
			errs.description = "Description is required";

		if (!form.fees || form.fees <= 0)
			errs.fees = "Enter a valid fees amount";

		if (!form.start_date) errs.start_date = "Start date is required";

		if (!form.end_date) errs.end_date = "End date is required";

		if (
			form.start_date &&
			form.end_date &&
			new Date(form.end_date) < new Date(form.start_date)
		)
			errs.end_date = "End date cannot be before start date";

		if (!form.video_expire_days || form.video_expire_days <= 0)
			errs.video_expire_days = "Enter valid expiry days";

		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validate()) {
			toast.error("Please fix form errors before submitting");
			return;
		}

		try {
			const res = await addCourse(form);

      console.log(res)
      
			const courseId = res.data?.data?.insertId;
			if (!courseId) throw new Error("Course ID missing from response");

			if (imageFile) {
				const formData = new FormData();
				formData.append("image", imageFile);
				formData.append("course_id", courseId);

				uploadImage(formData).catch((err) => {
					console.error("Image upload failed:", err);
					toast.error("Course added but image upload failed");
				});
			}

			toast.success("Course added successfully 🎉");
			setTimeout(() => navigate("/allcourses"), 1200);
		} catch (err) {
			console.error(err);
			toast.error(err?.response?.data?.message || "Failed to add course");
		}
	};

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

			<div className="relative max-w-7xl mx-auto">
				<Navbar />

				<div className="flex justify-center py-12 px-4">
					<form
						onSubmit={handleSubmit}
						className="w-full max-w-2xl
              bg-white/20 backdrop-blur-xl border border-white/40
              shadow-2xl rounded-3xl p-8 space-y-5 text-blue-900"
					>
						<h2 className="text-2xl font-semibold text-center text-blue-950">
							Add New Course
						</h2>

						{/* Course Name */}
						<div>
							<label className="font-medium">Course Name</label>
							<input
								name="course_name"
								value={form.course_name}
								onChange={handleChange}
								className="w-full glass-input"
								placeholder="Enter course name"
							/>
							{errors.course_name && (
								<p className="text-red-600 text-sm">
									{errors.course_name}
								</p>
							)}
						</div>

						{/* Description */}
						<div>
							<label className="font-medium">Description</label>
							<textarea
								rows={3}
								name="description"
								value={form.description}
								onChange={handleChange}
								className="w-full glass-input resize-none"
								placeholder="Write course description..."
							/>
							{errors.description && (
								<p className="text-red-600 text-sm">
									{errors.description}
								</p>
							)}
						</div>

						{/* Fees */}
						<div>
							<label className="font-medium">Fees (₹)</label>
							<input
								type="number"
								name="fees"
								value={form.fees}
								onChange={handleChange}
								className="w-full glass-input"
								placeholder="Eg: 9999"
							/>
							{errors.fees && (
								<p className="text-red-600 text-sm">
									{errors.fees}
								</p>
							)}
						</div>

						{/* Dates */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="font-medium">
									Start Date
								</label>
								<input
									type="date"
									name="start_date"
									value={form.start_date}
									onChange={handleChange}
									className="w-full glass-input"
								/>
								{errors.start_date && (
									<p className="text-red-600 text-sm">
										{errors.start_date}
									</p>
								)}
							</div>

							<div>
								<label className="font-medium">End Date</label>
								<input
									type="date"
									name="end_date"
									value={form.end_date}
									onChange={handleChange}
									className="w-full glass-input"
								/>
								{errors.end_date && (
									<p className="text-red-600 text-sm">
										{errors.end_date}
									</p>
								)}
							</div>
						</div>

						{/* Video Expiry */}
						<div>
							<label className="font-medium">
								Video Expire Days
							</label>
							<input
								type="number"
								name="video_expire_days"
								value={form.video_expire_days}
								onChange={handleChange}
								className="w-full glass-input"
								placeholder="Eg: 180"
							/>
							{errors.video_expire_days && (
								<p className="text-red-600 text-sm">
									{errors.video_expire_days}
								</p>
							)}
						</div>

						{/* Course Thumbnail */}
						<div className="pt-2">
							<p className="font-medium text-blue-900">
								Course Thumbnail
							</p>

							<div
								className="mt-2 flex flex-col items-center justify-center gap-4
    bg-white/25 border border-white/40 rounded-2xl
    backdrop-blur-xl shadow-inner p-5"
							>
								<label
									className="px-5 py-2.5 rounded-full cursor-pointer
      bg-gradient-to-r from-sky-400/80 to-blue-500/80
      text-white font-medium tracking-wide
      hover:from-sky-500 hover:to-blue-600
      shadow-md hover:-translate-y-0.5 transition-all"
								>
									Upload Image
									<input
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleFileChange}
									/>
								</label>

								{image ? (
									<img
										src={image}
										alt="preview"
										className="w-44 h-44 object-cover rounded-2xl border border-white/60 shadow-lg"
									/>
								) : (
									<div
										className="w-44 h-44 rounded-2xl border border-dashed border-white/60
        flex items-center justify-center text-blue-900/70 text-sm"
									>
										No image selected
									</div>
								)}
							</div>
						</div>

						{/* Buttons */}
						<div className="flex justify-between pt-3">
							<button
								type="button"
								onClick={() => navigate(-1)}
								className="px-6 py-2 rounded-full bg-white/60 hover:bg-white text-blue-800 font-medium shadow"
							>
								Cancel
							</button>

							<button
								type="submit"
								className="px-8 py-2 rounded-full font-semibold text-white
                  bg-gradient-to-r from-emerald-400 to-teal-500
                  shadow-lg hover:-translate-y-0.5 transition-all"
							>
								Save Course
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddCourse;
