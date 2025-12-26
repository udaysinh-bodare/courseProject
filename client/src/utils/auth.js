import { jwtDecode } from "jwt-decode";

export function getAuthUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);  // returns { email, role, ... }
  } catch {
    return null;
  }
}

export function getAuthToken() {
  return localStorage.getItem("token");
}
