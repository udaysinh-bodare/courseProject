const allVideo="select * from videos"
const addVideo="insert into videos(course_id,title,discription,youtube_url) values(?,?,?,?)";

module.exports = {
    allVideo,
    addVideo
}