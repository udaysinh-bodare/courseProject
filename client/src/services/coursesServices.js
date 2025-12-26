import axios from "axios";
import { config } from "../config/config";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export async function getAllCourses() {
  const url = `${config.BASE_URL}/api/courses/all-active-courses`;
  return axios.get(url, { headers: authHeaders() });
}

export async function addCourse(payload) {
  const url = `${config.BASE_URL}/api/courses-add`;
  return axios.post(url, payload, { headers: authHeaders() });
}

export async function getCourseDetails(course_id) {
  const url = `${config.BASE_URL}/api/courses/course-details/${course_id}`;
  return axios.get(url, { headers: authHeaders() });
}
