const allVideo="select * from videos WHERE course_id = ?"
const addVideo="insert into videos(course_id,title,description,youtube_url,added_at) values(?,?,?,?,current_date())";

module.exports = {
    allVideo,
    addVideo
}