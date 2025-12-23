const pool = require("../config/db");
const {delete_Video_sql} = require("../services/video.services")
const { allVideo, addVideo, updateVideo } = require("../services/video.services");

// GET videos by course_id
function videos(req, res) {
  const course_id = req.params.course_id;

  if (!course_id) {
    return res.status(400).json({
      status: "error",
      message: "course_id is required"
    });
  }

  pool.query(allVideo, [course_id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).json({
      status: "success",
      data: result
    });
  });
}

// ADD new video
function addvideo(req, res) {
  const { course_id, title, description, youtube_url } = req.body;

  if (!course_id || !title || !youtube_url) {
    return res.status(400).json({
      status: "error",
      message: "course_id, title and youtube_url are required"
    });
  }

  pool.query(
    addVideo,
    [course_id, title, description || null, youtube_url],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(201).json({
        status: "success",
        data: result
      });
    }
  );
}

function deleteVideo(req, res) {
    const video_id = req.params.video_id
    if(!video_id) {
        return res.status(403).json({
            "status" : "Error",
            "message": "Video_id not found."
        })
    }
    pool.query(delete_Video_sql, [video_id], (error, data)=>{
        if(data) {
            if(data.length == 0) {
                return res.status(400).json({
                    "status" : "Error",
                    "message": "Video_id not avaiable."
                })
            }
            else {
                res.status(200).json({
                    status: "Success",
                    data: data
                })
            }
        }
        else {
            res.status(500).send(error)
        }
    })
}


// UPDATE video
function updatevideo(req, res) {
  const video_id = req.params.video_id;
  const { course_id, title, description, youtube_url } = req.body;

  if (!video_id) {
    return res.status(400).json({
      status: "error",
      message: "video_id is required"
    });
  }

  if (!course_id || !title || !youtube_url) {
    return res.status(400).json({
      status: "error",
      message: "course_id, title and youtube_url are required"
    });
  }

  pool.query(
    updateVideo,
    [course_id, title, description || null, youtube_url, video_id],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).json({
        status: "success",
        data: result
      });
    }
  );
}

module.exports = {
  videos,
  addvideo,
  updatevideo,
  deleteVideo
};
