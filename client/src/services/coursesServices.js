import axios from "axios";
import { config } from "../config/config";

export async function getAllCourses() {
    const url = config.BASE_URL + "/api/courses/all-active-courses"
    const response = await axios.get(url)
    return response
}