import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h3>Task Manager</h3>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        {role === "ROLE_ADMIN" && <Link to="/users">Users</Link>}

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;