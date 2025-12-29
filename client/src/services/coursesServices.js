import { config } from "../config/config";
import axios from "axios";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    token: token
  };
}

export async function getAllCourses() {
    const url = config.BASE_URL + "/api/courses/all-active-courses"
    const response = await axios.get(url)
    return response
}

export async function myCourses(token) {
    const url = config.BASE_URL + '/api/student/my-course-description'
    const headers = {
        token
    }
    const res = await axios.get(url, {headers})
    return res
}
  

export async function addCourse(payload) {
  const url = `${config.BASE_URL}/api/courses/courses-add`;
  return axios.post(url, payload, { headers: authHeaders() });
}

export async function getCourseDetails(course_id) {
  const url = `${config.BASE_URL}/api/courses/course-details/${course_id}`;
  return axios.get(url, { headers: authHeaders() });
}


export async function deleteCourse(course_id) {
  const url = `${config.BASE_URL}/api/courses/delete-course/${course_id}`;
  return axios.delete(url, { headers: authHeaders() });
}

export async function editCourse(payload, course_id) {
  const url =  config.BASE_URL + `/api/admin/update-course/${course_id}`
  const res = axios.put(url, payload, {headers: authHeaders()})
  return res
}