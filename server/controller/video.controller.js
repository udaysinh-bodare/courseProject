const pool = require("../config/db");
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
  updatevideo
};
