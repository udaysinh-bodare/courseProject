import axios from "axios";
import { config } from "../config/config";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    token: token
  };
}


export async function addVideo(payload) {
  const url = `${config.BASE_URL}/api/video/add-video`;
  return axios.post(url, payload, { headers: authHeaders() });
}
