import React, { useEffect, useState } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import { getAuthUser } from "../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { editCourse } from "../../services/coursesServices";
function EditCourse() {
    const navigate = useNavigate()
    const {course_id} = useParams()
    useEffect(()=>{
        const user = getAuthUser()
        if(!user) {
            toast.error("Not Logged In")
            navigate('/login')
        }
        if(user.role !== "admin") {
            toast.error("Not Authorised")
            navigate('/login')
        }
    })

    const[course_name, setCourseName] = useState("")
    const[description, setDescription] = useState("")
    const[fees, setFees] = useState(null)
    const [start_date, setStart_date] = useState("")
    const[end_date, setEnd_date] = useState("")
    const[video_expire_days, setVideo_expire_days] = useState("")
    
    const updateCourse = async()=>{
        const payload = {
            course_name: course_name,
            description: description,
            fees: fees,
            start_date: start_date,
            end_date: end_date,
            video_expire_days: video_expire_days
        }
        try {

          const res = await editCourse(payload, course_id)
        }catch{
          
        }
        
    }


  return (
    <div>
      <div
        className="wrapper min-h-screen w-full bg-cover bg-fixed "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Navbar />

        <div className="flex justify-center py-12 px-4">
          <form
            // onSubmit={handleSubmit}
            className="w-full max-w-2xl
              bg-white/20 backdrop-blur-xl border border-white/40
              shadow-2xl rounded-3xl p-8 space-y-5 text-blue-900"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-950">
              Edit Course
            </h2>

            {/* Course Name */}
            <div>
              <label className="font-medium">Course Name</label>
              <input
                name="course_name"
                // value={form.course_name}
                onChange={(e)=>setCourseName(e.target.value)}
                className="w-full glass-input"
                placeholder="Enter course name"
              />
              
            </div>

            {/* Description */}
            <div>
              <label className="font-medium">Description</label>
              <textarea
                rows={3}
                name="description"
                // value={form.description}
                onChange={(e)=>setDescription(e.target.value)}
                className="w-full glass-input resize-none"
                placeholder="Write course description..."
              />
             
            </div>

            {/* Fees */}
            <div>
              <label className="font-medium">Fees (₹)</label>
              <input
                type="number"
                name="fees"
                // value={form.fees}
                onChange={(e)=>setFees(e.target.value)}
                className="w-full glass-input"
                placeholder="Eg: 9999"
              />
              
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                //   value={form.start_date}
                onChange={(e)=>setStart_date(e.target.value)}
                  className="w-full glass-input"
                />
               
              </div>

              <div>
                <label className="font-medium">End Date</label>
                <input
                  type="date"
                  name="end_date"
                //   value={form.end_date}
                onChange={(e)=>setEnd_date(e.target.value)}
                  className="w-full glass-input"
                />
                
              </div>
            </div>

            {/* Video Expiry */}
            <div>
              <label className="font-medium">Video Expire Days</label>
              <input
                type="number"
                name="video_expire_days"
                // value={form.video_expire_days}
                onChange={(e)=>setVideo_expire_days(e.target.value)}
                className="w-full glass-input"
                placeholder="Eg: 180"
              />
              
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

export default EditCourse;
