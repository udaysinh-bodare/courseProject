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

export async function registerStudent(name, email, password, course_id, mobile_no) {
    const url = config.BASE_URL + '/api/student/register-to-course'
    
    const body = {
        name, 
        email, 
        password, 
        course_id, 
        mobile_no,
    }
    const response = await axios.post(url, body)
    return response
}

export async function changePassword(password) {
    const url = config.BASE_URL + '/api/student/changepass/'
    const body = {
         password: password
    }
    const response = await axios.put(url, body, {headers: authHeaders()})
    return response
}

export async function getAllStudentsByid(course_id){
        const url = config.BASE_URL + '/api/courses/enrolled-students/';
        console.log(url);
        const body = {
            course_id : course_id
        };

     const response = await axios.post(url, body, {headers: authHeaders()})
    return response

}

export async function getAllStudents(){
        const url = config.BASE_URL + '/api/courses/allstudents/';
        console.log(url);

     const response = await axios.get(url,{headers: authHeaders()})
    return response

}

export async function sendemailsys(name,email,message) {
    const url = config.BASE_URL + '/api/student/contact-us/';
    const body = {
        name : name ,
        email : email,
        message : message
    }
     const response = await axios.post(url,body)
    return response 
}