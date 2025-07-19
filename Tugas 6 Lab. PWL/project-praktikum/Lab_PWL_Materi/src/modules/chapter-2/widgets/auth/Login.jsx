// import React, { useState } from "react";
// import { ButtonPrimary } from "../components/ButtonUI";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Dummy auth
//     if (username && password) {
//       localStorage.setItem("user", username); // Simpan ke storage
//       navigate("/chapter-2");

//        // Redirect ke halaman setelah login
//     } else {
//       alert("Username dan Password wajib diisi!");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-5">
//       <div className="card" style={{ width: "32rem" }}>
//         <div className="card-body">
//           <h2 className="card-title text-center">Login</h2>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input type="email" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <div className="mb-3">
//             <ButtonPrimary items={{ btn_class: "btn-primary", type: "button" }} actions={handleLogin}>
//               Login
//             </ButtonPrimary>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { ButtonPrimary } from "../components/ButtonUI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Username dan Password wajib diisi!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        username,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        console.log(token);
        navigate("/chapter-2");
      } else {
        alert("Login gagal: Token tidak ditemukan.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login gagal. Cek username/password atau server.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card" style={{ width: "32rem" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
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
