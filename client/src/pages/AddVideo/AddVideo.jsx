import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { getAuthUser } from "../../utils/auth";
import { addVideo } from "../../services/videoServices";

function AddVideo() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { course_id } = useParams();   // <<--- GET FROM URL

  // ---------- ROLE CHECK ----------
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

    setForm(f => ({ ...f, course_id: course_id || "" }));
    setLoading(false);
  }, []);

  // ---------- FORM STATE ----------
  const [form, setForm] = useState({
    title: "",
    description: "",
    youtube_url: "",
    course_id: "",  
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ---------- VALIDATION ----------
  const validate = () => {
    const errs = {};

    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";

    if (!form.youtube_url.trim())
      errs.youtube_url = "YouTube URL is required";

    const ytRegex = /(youtube\.com|youtu\.be)\//i;
    if (form.youtube_url && !ytRegex.test(form.youtube_url))
      errs.youtube_url = "Enter a valid YouTube link";

    if (!form.course_id.trim())
      errs.course_id = "Course ID is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Fix form errors before submitting");
      return;
    }

    const payload = {
      ...form,
      added_at: new Date().toISOString(),
    };

    try {
      await addVideo(payload);
      toast.success("Video added successfully 🎉");

      setTimeout(() => navigate(`/allvideos/${form.course_id}`), 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to add video");
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
            className="w-full max-w-2xl bg-white/20 backdrop-blur-xl
              border border-white/40 shadow-2xl rounded-3xl p-8 space-y-5 text-blue-900"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-950">
              Add New Video
            </h2>

            {/* Title */}
            <div>
              <label className="font-medium">Video Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full glass-input"
                placeholder="Enter video title"
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
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
                placeholder="Write video description..."
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
            </div>

            {/* YouTube URL */}
            <div>
              <label className="font-medium">YouTube URL</label>
              <input
                name="youtube_url"
                value={form.youtube_url}
                onChange={handleChange}
                className="w-full glass-input"
                placeholder="https://youtube.com/..."
              />
              {errors.youtube_url && (
                <p className="text-red-600 text-sm">{errors.youtube_url}</p>
              )}
            </div>

            {/* Course ID (readonly + gray) */}
            <div>
              <label className="font-medium">Course ID</label>
              <input
                name="course_id"
                value={form.course_id}
                readOnly
                className="w-full glass-input bg-gray-200 cursor-not-allowed"
              />
              {errors.course_id && (
                <p className="text-red-600 text-sm">{errors.course_id}</p>
              )}
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
                Save Video
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVideo;
