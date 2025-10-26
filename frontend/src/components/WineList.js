import React, { useState } from "react";
import { toast } from "react-toastify";

export default function WineList({ wines, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    winery: "",
    year: "",
    type: "Red",
    price: "",
    stockQuantity: "",
  });

  const startEdit = (wine) => {
    setEditingId(wine.id);
    setForm({
      name: wine.name || "",
      winery: wine.winery || "",
      year: wine.year ?? "",
      type: wine.type || "Red",
      price: wine.price ?? "",
      stockQuantity: wine.stockQuantity ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      winery: "",
      year: "",
      type: "Red",
      price: "",
      stockQuantity: "",
    });
  };

  const saveEdit = async (id) => {
    if (!form.name.trim()) return toast.warn("Name is required.");
    if (!form.winery.trim()) return toast.warn("Winery is required.");
    if (form.year === "" || isNaN(Number(form.year))) return toast.warn("Year must be a number.");
    if (!form.type.trim()) return toast.warn("Type is required.");
    if (form.price === "" || isNaN(Number(form.price))) return toast.warn("Price must be a number.");
    if (form.stockQuantity === "" || isNaN(Number(form.stockQuantity)))
      return toast.warn("Stock Quantity must be a number.");

    const payload = {
      id,
      name: form.name.trim(),
      winery: form.winery.trim(),
      year: parseInt(form.year, 10),
      type: form.type.trim(),
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity, 10),
    };

    await onUpdate(id, payload);
    cancelEdit();
  };

  if (!wines || wines.length === 0)
    return <p className="text-muted">No wines yet.</p>;

  return (
    <div className="row">
      {wines.map((wine) => (
        <div className="col-md-6 mb-4" key={wine.id}>
          <div className="card shadow-sm">
            <div className="card-body">
              {editingId === wine.id ? (
                <>
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Winery</label>
                      <input
                        className="form-control"
                        value={form.winery}
                        onChange={(e) => setForm({ ...form, winery: e.target.value })}
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label">Year</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                      />
                    </div>
                    <div className="col-4">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                      >
                        <option>Red</option>
                        <option>White</option>
                        <option>Rose</option>
                      </select>
                    </div>
                    <div className="col-2">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                      />
                    </div>
                    <div className="col-2">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.stockQuantity}
                        onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(wine.id)}
                    >
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title mb-1">{wine.name}</h5>
                  <div className="text-muted mb-2">
                    Winery: {wine.winery} • Year: {wine.year} • Type: {wine.type}
                  </div>
                  <div className="mb-3">
                    <strong>Price:</strong> {(wine.price ?? 0).toFixed(2)} |{" "}
                    <strong>Stock:</strong> {wine.stockQuantity ?? 0}
                  </div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => startEdit(wine)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(wine.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
