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

export async function getAllVideos(course_id) {
  const url = `${config.BASE_URL}/api/video/all-videos/${course_id}`;
  
  return axios.get(url, { headers: authHeaders() });
}

export async function deleteVideo(id) {
  const url = `${config.BASE_URL}/api/video/delete-video/${id}`;
  return axios.delete(url, { headers: authHeaders() });
}

export function editVideo(payload, video_id) {

  const url = config.BASE_URL + `/api/video/update-video/${video_id}`
  const res = axios.put(url, payload, {headers: authHeaders()})
  console.log(res);
  
  return res
}

export async function getVidDetails(video_id) {
  const url = config.BASE_URL + '/api/video/get-video-details'
  const body = {
    video_id: video_id
  }

  const res = await axios.post(url, body, {headers: authHeaders()})
    
  return res
}

