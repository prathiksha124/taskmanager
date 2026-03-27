import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users", {
      headers: {
        Authorization: "Basic " + localStorage.getItem("auth"),
      },
    }).then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-4">
        <div className="card p-3">

          <h3>Users</h3>

          <table className="table text-center">
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                   <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Users;