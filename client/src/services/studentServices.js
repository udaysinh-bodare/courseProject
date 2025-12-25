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