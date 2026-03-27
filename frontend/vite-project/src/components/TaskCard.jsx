function TaskCard({ task, onDelete, onUpdate }) {
  return (
    <div className="card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <p>Status: <b>{task.status}</b></p>

      {/* ✅ UPDATE BUTTONS */}
      <button onClick={() => onUpdate(task, "IN_PROGRESS")}>
        Start
      </button>

      <button onClick={() => onUpdate(task, "DONE")}>
        Complete
      </button>

      {/* ✅ DELETE BUTTON */}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskCard;