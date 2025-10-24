import React, { useState } from "react";

function AddUserForm({ onAdd }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !role) return;

    onAdd({ username, email, role });
    setUsername("");
    setEmail("");
    setRole("");
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">Add User</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Role"
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
