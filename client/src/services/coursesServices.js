import axios from "axios";
import { config } from "../config/config";

export async function getAllCourses() {
    const url = config.BASE_URL + "/api/courses/all-active-courses"
    const response = await axios.get(url)
    return response
}

export async function getCourseDetails(course_id) {
    const url = config.BASE_URL + `/api/courses/course-details/${course_id}`
    const response = await axios.get(url)
    return response
}