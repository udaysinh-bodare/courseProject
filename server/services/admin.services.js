const get_course_sql = "SELECT course_name FROM courses WHERE start_date = ? AND end_date = ?";

const update_course_sql = `UPDATE courses SET course_name = ?, description = ?, fees = ?, start_date = ?, end_date = ?, video_expire_days = ? WHERE course_id = ?`;

const delete_course_sql = "DELETE FROM courses WHERE course_id = ?"

module.exports = {
  get_course_sql,
  update_course_sql,
  delete_course_sql
};
