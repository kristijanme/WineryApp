import React, { useState } from "react";

export default function AddWineForm({ onAdd }) {
  const [name, setName] = useState("");
  const [winery, setWinery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !winery || !year || !type) return;
    const newWine = { name, winery, year: parseInt(year, 10), type };
    onAdd(newWine);
    setName(""); setWinery(""); setYear(""); setType("");
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Add New Wine</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Wine Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Winery" 
              value={winery} 
              onChange={e => setWinery(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-2">
            <input 
              type="number" 
              className="form-control" 
              placeholder="Year" 
              value={year} 
              onChange={e => setYear(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type (Red / White / Rose)" 
              value={type} 
              onChange={e => setType(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Add Wine</button>
        </form>
      </div>
    </div>
  );
}
