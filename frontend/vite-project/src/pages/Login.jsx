import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const login = async () => {
  
    if (!email || !password) {
      setMessage("Please enter email and password ");
      setError(true);

      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("auth", btoa(email + ":" + password));
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.id);

      window.location.href = "/dashboard";

    } catch {
    
      setMessage("Invalid credentials ");
      setError(true);

      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* TITLE */}
        <h2 className="login-title">🚀 Task Manager</h2>

        <h4>Login</h4>

        {/* 🔥 MESSAGE DISPLAY */}
        {message && (
          <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
            {message}
          </div>
        )}

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p>
          New user? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;