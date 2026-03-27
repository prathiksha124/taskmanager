import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const register = async () => {

    // ✅ EMPTY FIELD VALIDATION
    if (!name || !email || !password) {
      setMessage("Please enter all fields ❌");
      setError(true);

      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });

      setMessage("Registered successfully ✅");
      setError(false);

      // redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      // ✅ USER ALREADY EXISTS
      setMessage("User already exists ❌");
      setError(true);

      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">🚀 Task Manager</h2>
        <h4>Register</h4>

        {/* ✅ MESSAGE */}
        {message && (
          <div className={error ? "alert alert-danger" : "alert alert-success"}>
            {message}
          </div>
        )}

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;