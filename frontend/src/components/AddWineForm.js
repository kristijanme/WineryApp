import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddWineForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    winery: "",
    year: "",
    type: "Red",
    price: "",
    stockQuantity: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.winery.trim()) return "Winery is required.";
    if (!form.year || isNaN(Number(form.year))) return "Year must be a number.";
    if (!form.type.trim()) return "Type is required.";
    if (form.price === "" || isNaN(Number(form.price)))
      return "Price must be a number.";
    if (form.stockQuantity === "" || isNaN(Number(form.stockQuantity)))
      return "Stock Quantity must be a number.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      toast.warn(msg);
      return;
    }

    const payload = {
      name: form.name.trim(),
      winery: form.winery.trim(),
      year: parseInt(form.year, 10),
      type: form.type.trim(),
      price: parseFloat(form.price),
      stockQuantity: parseInt(form.stockQuantity, 10),
    };

    try {
      if (onAdd) await onAdd(payload);

      toast.success("✅ Wine added successfully!");
      setForm({
        name: "",
        winery: "",
        year: "",
        type: "Red",
        price: "",
        stockQuantity: "",
      });
    } catch (err) {
      console.error("❌ Error adding wine:", err);
      toast.error("❌ Failed to add wine.");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Add New Wine</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Merlot"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Winery</label>
            <input
              className="form-control"
              name="winery"
              value={form.winery}
              onChange={onChange}
              placeholder="Tikves"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={form.year}
              onChange={onChange}
              placeholder="2021"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              name="type"
              value={form.type}
              onChange={onChange}
            >
              <option>Red</option>
              <option>White</option>
              <option>Rose</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={form.price}
              onChange={onChange}
              placeholder="149.99"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              name="stockQuantity"
              value={form.stockQuantity}
              onChange={onChange}
              placeholder="50"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Wine
          </button>
        </form>
      </div>
    </div>
  );
}
