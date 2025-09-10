// WineList.js
import React, { useState } from "react";

export default function WineList({ wines, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", winery: "", year: "", type: "" });

  const startEdit = (wine) => {
    setEditingId(wine.id);
    setForm({ name: wine.name, winery: wine.winery, year: wine.year, type: wine.type });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", winery: "", year: "", type: "" });
  };

  const saveEdit = async (id) => {
    if (!form.name || !form.winery || !form.year || !form.type) return;
    await onUpdate(id, { id, name: form.name, winery: form.winery, year: parseInt(form.year, 10), type: form.type });
    cancelEdit();
  };

  if (!wines || wines.length === 0) return <p>No wines yet.</p>;

  return (
    <div className="row">
      {wines.map((wine) => (
        <div className="col-md-6 mb-4" key={wine.id}>
          <div className={`card shadow-sm ${wine.type === 'Red' ? 'wine-red' : wine.type === 'White' ? 'wine-white' : 'wine-rose'}`}>
            <div className="card-body">
              {editingId === wine.id ? (
                <>
                  <div className="mb-2">
                    <input
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Wine Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="form-control"
                      value={form.winery}
                      onChange={(e) => setForm({ ...form, winery: e.target.value })}
                      placeholder="Winery"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      placeholder="Year"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      placeholder="Type (Red / White / Rose)"
                    />
                  </div>
                  <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(wine.id)}>Save</button>
                  <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <h5 className="card-title">{wine.name}</h5>
                  <p className="card-text">
                    Winery: {wine.winery}<br />
                    Year: {wine.year}<br />
                    Type: {wine.type}
                  </p>
                  <button className="btn btn-light btn-sm me-2" onClick={() => startEdit(wine)}>Edit</button>
                  <button className="btn btn-dark btn-sm" onClick={() => onDelete(wine.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
