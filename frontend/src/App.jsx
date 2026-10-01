import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/tasks`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Could not connect to backend API: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle }),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const created = await res.json();
      setTasks([...tasks, created]);
      setNewTaskTitle('');
    } catch (err) {
      alert('Error adding task: ' + err.message);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updated = await res.json();
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="badge">🚀 AWS EC2 + Dokploy Demo</div>
        <h1>Full-Stack Task Manager</h1>
        <p className="subtitle">
          React Frontend ↔ Express API ↔ PostgreSQL Database
        </p>
      </header>

      <div className="card">
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="Add a new task (e.g. Set up Dokploy on AWS)..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="task-input"
          />
          <button type="submit" className="add-button">
            Add Task
          </button>
        </form>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading">Loading tasks from PostgreSQL...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">No tasks yet. Add one above!</div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task)}
                  />
                  <span>{task.title}</span>
                </label>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="delete-button"
                  title="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="footer">
        <span>Backend API Status: </span>
        <code className="api-url">{API_BASE}</code>
      </footer>
    </div>
  );
}
