import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const ContactUI = ({ selectedUser, HandlerSelectedChat }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.id); 
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // atau navigate ke login
  };

  return (
    <div className="bg-light border-end h-100 overflow-auto" style={{ minHeight: "90vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
        <div className="fw-semibold text-dark">
          {users.find(u => u.id === currentUserId)?.fullname || "You"}
        </div>
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* List of other users */}
      {users
        .filter((user) => user.id !== currentUserId)
        .map((user) => {
          const initial = user.fullname ? user.fullname.charAt(0).toUpperCase() : "?";
          return (
            <div
              key={user.id}
              onClick={() => HandlerSelectedChat(user)}
              className={`d-flex align-items-center p-2 border-bottom ${
                selectedUser?.id === user.id ? "bg-primary text-white" : "bg-white text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              <div
                className="rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {initial}
              </div>
              <div>
                <div className="fw-semibold">{user.fullname}</div>
                <small className="text-muted">ID: {user.id} | {user.username}</small>
              </div>
            </div>
          );
        })}
    </div>
  );
};