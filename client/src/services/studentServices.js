import axios from "axios";
import { config } from "../config/config";

export async function loginStudent(email, password) {
    const url = config.BASE_URL + "/api/auth/login"
    const body = {
        email,
        password
    }
    const response = await axios.post(url, body)
    return response
}

export async function registerStudent(name, email, password, course_id, mobile_no, profile_pic) {
    const url = config.BASE_URL + '/api/student/register-to-course'
    
    const body = {
        name, 
        email, 
        password, 
        course_id, 
        mobile_no,
        profile_pic
    }
    const response = await axios.post(url, body)
}

