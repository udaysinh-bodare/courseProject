import axios from "axios";
import { config } from "../config/config";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { token: token } : {};
}

export async function getUserDetails(email) {
  const url = `${config.BASE_URL}/api/auth/userdetails`;
  return axios.post(
    url,
    { email },
    { headers: authHeaders() }
  );
}
