import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({
    email: "",
    role: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    // Option 1: Use stored data (simple)
    setUser({
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role")
    });

    // Option 2: Call backend profile API (recommended)
    /*
    axios.get("http://localhost:2000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setUser(res.data.data);
    });
    */
  }, []);

  return (
    <div style={styles.container}>
      <h2>Profile</h2>

      <div style={styles.card}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <button onClick={logout} style={styles.btn}>
          Logout
        </button>
      </div>
    </div>
  );
}

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "80px"
  },
  card: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center"
  },
  btn: {
    marginTop: "20px",
    padding: "8px 16px",
    cursor: "pointer"
  }
};

export default Profile;
