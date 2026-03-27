import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const role = localStorage.getItem("role");

  const auth = {
    headers: {
      Authorization: "Basic " + localStorage.getItem("auth"),
    },
  };

 
  const loadUsers = async () => {
    try {
      const res = await api.get("/users", auth);
      setUsers(res.data);
    } catch {}
  };

  // ✅ LOAD TASKS
  const loadTasks = async () => {
    try {
      const userId = localStorage.getItem("userId");

      let url = "";

      if (role === "ROLE_ADMIN") {
        if (statusFilter && userFilter) {
          url = `/tasks?status=${statusFilter}&assignedTo=${userFilter}`;
        } else if (statusFilter) {
          url = `/tasks?status=${statusFilter}`;
        } else if (userFilter) {
          url = `/tasks?assignedTo=${userFilter}`;
        } else {
          url = `/tasks?userId=${userId}&role=${role}`;
        }
      } else {
  if (statusFilter) {
    url = `/tasks?userId=${userId}&role=${role}&status=${statusFilter}`;
  } else {
    url = `/tasks?userId=${userId}&role=${role}`;
  }
}
      const res = await api.get(url, auth);
      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ CREATE TASK
  const createTask = async () => {
    if (!title) {
      setMessage("Title is required ❌");
      setError(true);

      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await api.post(
        "/tasks",
        {
          title,
          description,
          status: "TODO",
          assignedTo: assignedTo ? Number(assignedTo) : null,
          createdBy: Number(localStorage.getItem("userId")),
        },
        auth
      );

      setMessage("Task created successfully ✅");
      setError(false);

      setTitle("");
      setDescription("");
      setAssignedTo("");

      loadTasks();

      setTimeout(() => setMessage(""), 2000);

    } catch (err) {
      setMessage("Task creation failed ❌");
      setError(true);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // ✅ UPDATE TASK
  const updateStatus = async (task, status) => {
    await api.put(`/tasks/${task.id}`, { ...task, status }, auth);
    loadTasks();
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`, auth);
    loadTasks();
  };

  // ✅ GET USER NAME
  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "User";
  };

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container-fluid mt-4">

        {/* ✅ MESSAGE (NO EMPTY BOX ISSUE) */}
        {message && (
          <div className="d-flex justify-content-center">
            <div className={`alert ${error ? "alert-danger" : "alert-success"} w-50 text-center`}>
              {message}
            </div>
          </div>
        )}

        {/* 🔹 CREATE TASK */}
        <div className="card p-3 mb-4 shadow">
          <h5>Create Task</h5>

          <div className="row g-2">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Assign User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <button className="btn btn-success w-100" onClick={createTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 FILTERS */}
        <div className="card p-3 mb-4 shadow">
          <h5>Filters</h5>

          <div className="row g-2">
            <div className="col-md-4">
              <select
                className="form-select"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            {role === "ROLE_ADMIN" && (
              <div className="col-md-4">
                <select
                  className="form-select"
                  onChange={(e) => setUserFilter(e.target.value)}
                >
                  <option value="">All Users</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={loadTasks}>
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 TASK LIST */}
        <div className="row px-3">
          {tasks.map((t) => (
            <div key={t.id} className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm">

                <h5>{t.title}</h5>
                <p>{t.description}</p>

                <p><b>Status:</b> {t.status}</p>
                <p><b>Assigned:</b> {getUserName(t.assignedTo)}</p>
                <p><b>Created By:</b> {getUserName(t.createdBy)}</p>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => updateStatus(t, "IN_PROGRESS")}
                  >
                    Start
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(t, "DONE")}
                  >
                    Done
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;