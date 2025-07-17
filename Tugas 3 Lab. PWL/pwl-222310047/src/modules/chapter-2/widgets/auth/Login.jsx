import React, { useState } from "react";
import { ButtonPrimary } from "../components/ButtonUI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Dummy auth
    if (username && password) {
      localStorage.setItem("user", username); // Simpan ke storage
      navigate("/chapter-2"); // Redirect ke halaman setelah login
    } else {
      alert("Username dan Password wajib diisi!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card" style={{ width: "32rem" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="email" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <ButtonPrimary items={{ btn_class: "btn-primary", type: "button" }} actions={handleLogin}>
              Login
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}
