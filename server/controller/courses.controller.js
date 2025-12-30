const pool = require("../config/db");
const result = require("../utils/result");

const {
  get_course_sql,
  update_course_sql,
  delete_course_sql,
} = require("../services/admin.services");

const {
  getallcourses,
  getstudentsbycourses,
  getCourseDetailsql,
  getAllstudentsql,
  allCourse
  
} = require("../services/courses.services");

// ADD COURSE
function addCourse(req, res) {
  const {
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days,
  } = req.body;

  if (!course_name || !fees || !start_date || !end_date) {
    return res.status(400).send(
      result.createResult("Missing required fields")
    );
  }

  const sql = `
    INSERT INTO courses
    (course_name, description, fees, start_date, end_date, video_expire_days)
    VALUES (?,?,?,?,?,?)
  `;

  pool.query(
    sql,
    [
      course_name,
      description || null,
      fees,
      start_date,
      end_date,
      video_expire_days || null,
    ],
    (error, data) => {
      if (error) {
        return res.status(500).send(result.createResult(error));
      }
      return res.status(201).send(result.createResult(null, data));
    }
  );
}

// UPLOAD IMAGE CODE

const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const multer = require("multer");
const { error } = require("console");



function uploadImage(req, res) {
  try {
    const course_id = req.body.course_id;

    if (!course_id) {
      return res
        .status(400)
        .send(result.createResult("course_id is required"));
    }

    if (!req.file) {
      return res
        .status(400)
        .send(result.createResult("No image uploaded"));
    }

    const targetDir = path.join(
      __dirname,
      "../../client/public/courseimages"
    );

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, `${course_id}.jpg`);

    fs.renameSync(req.file.path, targetPath);

    return res.send(
      result.createResult(null, {
        message: "Image saved successfully",
        filename: `${course_id}.jpg`,
      })
    );

  } catch (err) {
    console.error("Upload error:", err);
    return res
      .status(500)
      .send(result.createResult("Failed to save image"));
  }
}


function returnImage(req, res) {
  const { course_id } = req.params;

  if (!course_id) {
    return res.status(400).send(result.createResult("course_id is required"));
  }

  const imagePath = path.join(__dirname, "../../client/public/courseimages", `${course_id}.jpg`);

  if (!fs.existsSync(imagePath)) {
    return res.status(200).json({
      status: "ERROR",
      message: "Image not found",
      data: `/courseimages/default.jpg`
    });
  }

  res.status(200).json({
    status: "SUCCESS",
    message: "Image retrieved successfully",
    data: `/courseimages/${course_id}.jpg`

  });
}


async function deleteImage(req, res) {
  try {
    const { course_id } = req.params;

    if (!/^[a-zA-Z0-9_-]+$/.test(course_id)) {
      return res.status(400).send(result.createResult("Invalid course id"));
    }

    const imagePath = path.join(
      __dirname,
      "../../client/public/courseimages",
      `${course_id}.jpg`
    );

    await fsp.unlink(imagePath);  

    return res.send(result.createResult(null, "Image deleted successfully"));
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).send(result.createResult("Image not found"));
    }

    console.error("Delete image error:", err);
    return res
      .status(500)
      .send(result.createResult("Failed to delete image"));
  }
}

function courseWithoutDate(req, res) {
  pool.query(allCourse, (error, data)=>{
    if(error) {
      return res.status(404).send(result.createResult(error))
    }
    return res.send(result.createResult(null, data))
  })
}


// GET COURSES BETWEEN DATES
function getCourses(req, res) {
  const { start_date, end_date } = req.body;

  if (!start_date || !end_date) {
    return res.status(400).send(
      result.createResult("start_date and end_date are required")
    );
  }

  pool.query(get_course_sql, [start_date, end_date], (error, data) => {
    if (error) {
      return res.status(500).send(result.createResult(error));
    }

    if (data.length === 0) {
      return res.send(
        result.createResult("No course exists between these dates")
      );
    }

    return res.send(result.createResult(null, data));
  });
}

// UPDATE COURSE
function updateCourse(req, res) {
  const course_id = req.params.course_id;
  const {
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days,
  } = req.body;

  if (!course_id) {
    return res.status(400).send(
      result.createResult("course_id is required")
    );
  }

  pool.query(
    update_course_sql,
    [
      course_name,
      description || null,
      fees,
      start_date,
      end_date,
      video_expire_days,
      course_id,
    ],
    (error, data) => {
      if (error) {
        return res.status(500).send(result.createResult(error));
      }

      if (data.affectedRows === 0) {
        return res.send(
          result.createResult("Course id doesn't match")
        );
      }

      return res.send(result.createResult(null, data));
    }
  );
}

// DELETE COURSE
function deleteCourse(req, res) {
  const course_id = req.params.course_id;

  if (!course_id) {
    return res.status(400).send(
      result.createResult("course_id is required")
    );
  }

  pool.query(delete_course_sql, [course_id], (error, data) => {
    if (error) {
      return res.status(500).send(result.createResult(error));
    }

    if (data.affectedRows === 0) {
      return res.send(
        result.createResult("Course id doesn't match")
      );
    }

    return res.send(result.createResult(null, data));
  });
}

// GET ACTIVE COURSES
function activeCourses(req, res) {
  pool.query(getallcourses, [], (err, data) => {
    if (err) {
      return res.status(500).send(result.createResult(err));
    }

    if (data.length === 0) {
      return res.send(
        result.createResult("No courses available")
      );
    }

    return res.send(result.createResult(null, data));
  });
}

// GET ENROLLED STUDENTS BY COURSE
function enrolledstudents(req, res) {
  const { course_id } = req.body;

  if (!course_id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Course ID"
    });
  }

  pool.query(getstudentsbycourses, [course_id], (err, data) => {
    if (err) {
      return res.status(500).send(result.createResult(err));
    }

    if (data.length === 0) {
      return res.send(
        result.createResult("No students available")
      );
    }

    return res.send(result.createResult(null, data));
  });
}

function getCourseDetails(req, res) {
  const { course_id } = req.params;

  if (!course_id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Course ID"
    });
  }
  pool.query(getCourseDetailsql, [course_id], (err, data) => {
    if (err) {
      return res.status(500).send(result.createResult(err));
    } 
    if (data.length === 0) {
      return res.send(
        result.createResult("No course found with the given ID")
      );
    }
    return res.send(result.createResult(null, data));
  });
}

function getAllstudent (req,res){
      pool.query(getAllstudentsql,(err, data) => {
    if (err) {
      return res.status(500).send(result.createResult(err));
    } 
    if (data.length === 0) {
      return res.send(
        result.createResult("No students found")
      );
    }
    return res.send(result.createResult(null, data));
  });
}


module.exports = {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  activeCourses,
  enrolledstudents,
  getCourseDetails,
  getAllstudent,
  uploadImage,
  returnImage,
  deleteImage,
  courseWithoutDate
};
