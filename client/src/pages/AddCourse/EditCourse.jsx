import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import { getAuthUser } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { editCourse, getCourseDetails } from "../../services/coursesServices";
import AdminNavbar from "../../components/AdminNavbar";

function EditCourse() {
  const navigate = useNavigate();
  const { course_id } = useParams();

  // ✅ FIX 1: correct state setter name
  const [course_name, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState(null);
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [video_expire_days, setVideo_expire_days] = useState("");

  // ✅ FIX 2: dependency array added
  useEffect(() => {
    console.log("type",typeof(course_id));
    
    const user = getAuthUser();
    if (!user) {
      toast.error("Not Logged In");
      navigate("/login");
      return;
    }
    if (user.role !== "admin") {
      toast.error("Not Authorised");
      navigate("/login");
      return;
    }

    oldCourseDets();
  }, []); // ✅ IMPORTANT

  const oldCourseDets = async () => {
    const res = await getCourseDetails(course_id);
    const d = res.data.data[0];

    setCourseName(d.course_name);
    setDescription(d.description);
    setStart_date(d.start_date);
    setEnd_date(d.end_date);
    setFees(d.fees);
    setVideo_expire_days(d.video_expire_days);
  };

  const updateCourse = async (e) => {
    e.preventDefault();

    if (!course_name) toast.warn("Course Name is Empty");
    else if (!fees) toast.warn("Fees is Empty");
    else if (!start_date) toast.warn("Start date is Empty");
    else if (!end_date) toast.warn("End date is Empty");
    else {
      const payload = {
        course_name,
        description,
        fees,
        start_date,
        end_date,
        video_expire_days,
      };

      try {
        const res = await editCourse(payload, course_id);
        console.log(res);
        
        if (res.data.status === "success")
          toast.success("Course Edited Successfully");
      } catch (ex) {
        console.log(ex);
        toast.error("No Course with such id");
      }
    }
  };

  return (
    <div>
      <div
        className="wrapper min-h-screen w-full bg-cover bg-fixed"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <AdminNavbar/>

        <div className="flex justify-center py-12 px-4">
          <form
            onSubmit={updateCourse}
            className="w-full max-w-2xl bg-white/20 backdrop-blur-xl
              border border-white/40 shadow-2xl rounded-3xl
              p-8 space-y-5 text-blue-900"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-950">
              Edit Course
            </h2>

            <div>
              <label className="font-medium">Course Name</label>
              <input
                value={course_name}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full glass-input"
                placeholder="Enter course name"
              />
            </div>

            <div>
              <label className="font-medium">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full glass-input resize-none"
              />
            </div>

            <div>
              <label className="font-medium">Fees (₹)</label>
              <input
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="w-full glass-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={start_date}
                onChange={(e) => setStart_date(e.target.value)}
                className="w-full glass-input"
              />

              <input
                type="date"
                value={end_date}
                onChange={(e) => setEnd_date(e.target.value)}
                className="w-full glass-input"
              />
            </div>

            <div>
              <label className="font-medium">Video Expire Days</label>
              <input
                value={video_expire_days}
                onChange={(e) => setVideo_expire_days(e.target.value)}
                className="w-full glass-input"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-2 rounded-full font-semibold text-white
                bg-gradient-to-r from-emerald-400 to-teal-500"
            >
              Edit Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
