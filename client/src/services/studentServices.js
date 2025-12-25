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

export async function registerStudent(name, email, password, courseId, mobile, profilePic) {
    const url = config.BASE_URL + '/api/student/register-to-course'
    console.log(body);
    
    const body = {
        name, 
        email, 
        password, 
        courseId, 
        mobile,
        profilePic
    }
    const response = await axios.post(url, body)
    return response
}

