const allVideo="select * from videos WHERE course_id = ?"
const addVideo="insert into videos(course_id,title,description,youtube_url,added_at) values(?,?,?,?,current_date())";
const delete_Video_sql = "DELETE FROM videos WHERE video_id = ?"
    
const updateVideo = "UPDATE videos SET course_id = ?, title = ?, description = ?, youtube_url = ? WHERE video_id = ?"

module.exports = {
    allVideo,
    addVideo,
    updateVideo,
    delete_Video_sql
}