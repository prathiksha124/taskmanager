import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    api.get(`/tasks/${id}`, {
      headers: {
        Authorization: "Basic " + localStorage.getItem("auth"),
      },
    }).then(res => setTask(res.data));
  }, []);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Assigned: {task.assignedTo}</p>
    </div>
  );
}

export default TaskDetails;