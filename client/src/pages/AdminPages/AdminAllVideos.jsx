import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar";
import bg from "../../assets/background.png";
import { toast } from "react-toastify";

import { getAuthUser } from "../../utils/auth";
import { getCourseDetails } from "../../services/coursesServices";
import { getAllVideos, deleteVideo } from "../../services/videoServices";

const getYoutubeEmbed = (url) => {
  try {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  } catch {
    return null;
  }
};

function AdminAllVideos() {
  const navigate = useNavigate();
  const { course_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);

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
  }, []);

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await getCourseDetails(course_id);
        setCourse(res?.data?.data?.[0]);
      } catch {
        toast.error("Failed to load course");
      }
    }
    loadCourse();
  }, [course_id]);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await getAllVideos(course_id);
        setVideos(res?.data?.data || []);
      } catch {
        toast.error("Failed to load videos");
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, [course_id]);

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await deleteVideo(id);
      toast.success("Video deleted");
      setVideos(videos.filter((v) => v.video_id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-blue-500 to-sky-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-white/50 border-t-teal-400 rounded-full animate-spin" />
          <p className="text-white/90 font-medium tracking-wide">
            Loading videos…
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
              All Videos {course?.course_name && `(${course.course_name})`}
            </h1>

            <button
              onClick={() => navigate(`/addvideo/${course_id}`)}
              className="px-6 py-2 rounded-full font-semibold text-white
                bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg"
            >
              ➕ Add Video
            </button>
          </div>

          {/* Empty state */}
          {!videos.length && (
            <p className="text-center text-gray-600">No videos yet.</p>
          )}

          {/* VIDEO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <div
                key={v.video_id}
                className="bg-white/70 backdrop-blur border rounded-xl p-4 shadow group"
              >
                <h3 className="font-semibold text-lg">{v.title}</h3>
                <p className="text-sm text-gray-700 mb-3">
                  {v.description}
                </p>

                {/* YOUTUBE PREVIEW */}
                {getYoutubeEmbed(v.youtube_url) ? (
                  <div className="rounded-xl overflow-hidden mb-3">
                    <iframe
                      src={getYoutubeEmbed(v.youtube_url)}
                      title={v.title}
                      className="w-full h-48"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <p className="text-red-600 text-sm mb-3">
                    Invalid YouTube link
                  </p>
                )}

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => navigate(`/editvideo/${v.video_id}`)}
                    className="px-2 py-1 rounded-full bg-yellow-400/80 hover:bg-yellow-500"
                  >
                    ✏
                  </button>

                  <button
                    onClick={() => handleDeleteVideo(v.video_id)}
                    className="px-2 py-1 rounded-full bg-red-500/80 hover:bg-red-600 text-white"
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

export default AdminAllVideos;
