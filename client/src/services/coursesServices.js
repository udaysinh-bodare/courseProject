import axios from "axios";
import { config } from "../config/config";

function authHeaders() {
  const token = localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

export async function getAllCourses() {
  const url = config.BASE_URL + "/api/courses/all-active-courses";
  return await axios.get(url);
}

export async function addCourse(payload) {
  const url = config.BASE_URL + "/api/courses-add";
  return await axios.post(url, payload, { headers: authHeaders() });
}

export async function getCourseDetails(course_id) {
    const url = config.BASE_URL + `/api/courses/course-details/${course_id}`
    const response = await axios.get(url)
    return response
}
