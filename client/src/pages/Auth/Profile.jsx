import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import background from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import AdminNavbar from "../../components/AdminNavbar";
import { toast } from "react-toastify";
import { getUserDetails } from "../../services/userServices";
import { getAuthUser } from "../../utils/auth";
import { getCourseDetails } from "../../services/coursesServices";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return navigate("/login");
      }

      const auth = getAuthUser(token);
      if (!auth?.email) {
        toast.error("Invalid user session");
        return navigate("/login");
      }

      try {
        const res = await getUserDetails(auth.email);
        const u = res?.data?.data;

        // -------- Fetch course name for each enrolled course --------
        const studentsWithNames = await Promise.all(
          (u.students || []).map(async (s) => {
            try {
              const courseRes = await getCourseDetails(s.course_id);

              // API RETURNS ARRAY -> pick first record
              const course = courseRes?.data?.data?.[0];

              return {
                ...s,
                course_name: course?.course_name || "Unknown Course",
              };

            } catch {
              return { ...s, course_name: "Unknown Course" };
            }
          })
        );

        setUser({
          email: u.email,
          role: u.role,
          students: studentsWithNames,
        });

      } catch {
        toast.error("Failed to load profile");
        navigate("/login");
      }
    }

    loadProfile();
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const goToChangePassword = () => navigate("/changepassword");

  if (!user) return null;

  // Avatar
  const firstStudent = user.students[0];
  const avatarLetter =
    user.role === "admin" ? "A" : firstStudent?.name?.charAt(0) || "S";

  const avatarPic =
    user.role === "admin" ? null : firstStudent?.profile_pic;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {user.role === "student" ? <Navbar /> : <AdminNavbar />}

      <div className="flex justify-center py-16 px-4">
        <div className="w-full max-w-3xl bg-white/20 backdrop-blur-2xl
          border border-white/40 shadow-[0_40px_90px_rgba(0,0,0,0.25)]
          rounded-3xl p-10">

          {/* ===== PROFILE HEADER ===== */}
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">

            {avatarPic ? (
              <img
                src={avatarPic}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500
                flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {avatarLetter}
              </div>
            )}

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
                {user.role === "admin"
                  ? "Administrator"
                  : firstStudent?.name || "Student"}
              </h2>

              <p className="text-gray-700 mt-1 text-sm">{user.email}</p>

              <span className="inline-block mt-2 px-3 py-1 rounded-full
                text-xs font-semibold bg-white/60 border text-gray-800">
                {user.role?.toUpperCase()}
              </span>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={goToChangePassword}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow"
                >
                  🔒 Change Password
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 shadow"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/50 my-8" />

          {/* ===== STUDENT COURSES ===== */}
          {user.role === "student" && (
            <>
              <h3 className="text-lg font-semibold mb-3">Enrolled Courses</h3>

              {user.students.length === 0 && (
                <p className="text-gray-600 text-sm">
                  No course enrollments found.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.students.map((s, i) => (
                  <div key={i}
                    className="bg-white/40 backdrop-blur-xl rounded-2xl
                      border border-white/60 p-4 shadow"
                  >
                    <p className="text-[11px] text-gray-600">Course Name</p>
                    <p className="text-sm font-semibold">
                      {s.course_name}
                    </p>

                    <p className="text-[11px] text-gray-600 mt-2">
                      Student Name
                    </p>
                    <p className="text-sm font-semibold">
                      {s.name || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
