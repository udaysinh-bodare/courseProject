import axios from "axios";
import { config } from "../config/config";

export async function getAllCourses() {
    const url = config.BASE_URL + "/api/courses/all-active-courses"
    const response = await axios.get(url)
    return response
}

export async function myCourses(token) {
    const url = config.BASE_URL + '/api/student/my-courses'
    const headers = {
        token
    }
    const res = await axios.get(url, {headers})
    return res
}