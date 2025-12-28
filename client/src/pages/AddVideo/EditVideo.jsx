import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import bg from "../../assets/background.png";
import { Await, useNavigate, useParams } from "react-router";
import { editVideo, getVidDetails } from "../../services/videoServices";
import { toast } from "react-toastify";
import { getAuthUser} from "../../utils/auth"


function EditVideo() {
    const navigate = useNavigate()

    const {video_id} = useParams()

    useEffect(()=>{


        const user = getAuthUser()

        if(!user) {
            toast.error("login again")
            navigate('/login')
            return 
        }

        if(user.role !== "admin") {
            toast.error("You are not Admin")
            navigate('/login')
            return 
        }

        abc()
    },[])

    const abc = async()=>{

      const res = await getVidDetails(video_id)
      setOldCourse_id(res.data.data[0].course_id)
      setOldDesc(res.data.data[0].description)
      setOldUrl(res.data.data[0].youtube_url)
      setOldVidTitle(res.data.data[0].title)

      setCourse_id()

      console.log(res.data.data[0].title);
      
    }

    

    const [oldVidTitle, setOldVidTitle] = useState("")
    const [oldDesc, setOldDesc] = useState("")
    const [oldUrl, setOldUrl] = useState("")
    const [oldCourse_id, setOldCourse_id] = useState(null)
   

    const [vidTitle, setVidTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [url, setUrl] = useState("")
    const [course_id, setCourse_id] = useState(null)

    function stringToInt(str) {
      return parseInt(str, 10);
    }
    


    const editVid= async(e)=> {
        e.preventDefault()
        const payload = {
            title: vidTitle,
            description: desc,
            youtube_url: url,
            course_id: course_id
        }
        console.log("type ", typeof(video_id))
        console.log(payload);
        
        try {
            const res = await editVideo(payload, stringToInt(video_id))
            console.log(res);
            
            if(res.data.status == "success") {
                toast.success("Video Edited Successfuly")
            }
        }catch(ex) {
            console.log(ex);
            
            toast.error("Error Occured")
        }
    }

  return (
    <div
      className="wrapper min-w-full h-screen bg-cover bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />

      <div className="relative max-w-7xl mx-auto">
        

        <div className="flex justify-center py-12 px-4">
          <form
            className="w-full max-w-2xl bg-white/20 backdrop-blur-xl
              border border-white/40 shadow-2xl rounded-3xl p-8 space-y-5 text-blue-900"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-950">
              Edit Video
            </h2>

            {/* Title */}
            <div>
              <label className="font-medium">Video Title</label>
              <input
                name="title"
                // value={oldVidTitle}
                onChange={(e)=>setVidTitle(e.target.value)}
                className="w-full glass-input"
                placeholder={oldVidTitle}
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-medium">Description</label>
              <textarea
                rows={3}
                name="description"
                // value={oldDesc}
                onChange={(e)=>setDesc(e.target.value)}
                className="w-full glass-input resize-none"
                placeholder={oldDesc}
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="font-medium">YouTube URL</label>
              <input
                name="youtube_url"
                // value={oldUrl}
                onChange={(e)=>setUrl(e.target.value)}
                className="w-full glass-input"
                placeholder={oldUrl}
              />
            </div>

            {/* Course ID (readonly + gray) */}
            <div>
              <label className="font-medium">Course ID</label>
              <input
                className="w-full glass-input bg-gray-200 cursor-not-allowed"
                name="course_id"
                // value={oldCourse_id}
                placeholder={oldCourse_id}
                onChange={(e)=>setCourse_id(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-3">
              <button
                type="button"
                // onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-full bg-white/60 hover:bg-white text-blue-800 font-medium shadow"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-2 rounded-full font-semibold text-white
                  bg-gradient-to-r from-emerald-400 to-teal-500
                  shadow-lg hover:-translate-y-0.5 transition-all"
                onClick={editVid}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditVideo;
