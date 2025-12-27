import axios from "axios";
import { config } from "../config/config";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    token: token
  };
}


export async function loginStudent(email, password) {
    const url = config.BASE_URL + "/api/auth/login"
    const body = {
        email,
        password
    }
    console.log(body);
    
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

export async function changePassword(password) {
    const url = config.BASE_URL + '/api/student/changepass/'
    const body = {
         password: password
    }
    const response = await axios.put(url, body, {headers: authHeaders()})
    return response
}