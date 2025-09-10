import React, { useState, useEffect } from "react";
import axios from "axios";
import WineList from "./components/WineList";
import AddWineForm from "./components/AddWineForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [wines, setWines] = useState([]);
  const [filterType, setFilterType] = useState("All"); 
  const [searchText, setSearchText] = useState(""); 
  const API = "/api/wines";

  const fetchWines = async () => {
    try {
      const resp = await axios.get(API);
      setWines(resp.data);
    } catch (err) {
      console.error("Fetch wines error:", err);
      setWines([]);
    }
  };

  const addWine = async (wine) => {
    try {
      await axios.post(API, wine);
      await fetchWines();
    } catch (err) {
      console.error("Add wine error:", err);
    }
  };

  const deleteWine = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      await fetchWines();
    } catch (err) {
      console.error("Delete wine error:", err);
    }
  };

  const updateWine = async (id, updatedWine) => {
    try {
      await axios.put(`${API}/${id}`, updatedWine);
      await fetchWines();
    } catch (err) {
      console.error("Update wine error:", err);
    }
  };

  useEffect(() => {
    fetchWines();
  }, []);


  const normalize = (s) => (s || "").toString().trim().toLowerCase();

  const filteredWines = wines.filter(w => {
    if (filterType && filterType !== "All") {
      const t = normalize(w.type);
      const desired = filterType.toLowerCase();
      
      if (desired === "rose" || desired === "rosé") {
        if (!(t === "rose" || t === "rosé")) return false;
      } else {
        if (t !== desired) return false;
      }
    }
    if (searchText) {
      const s = searchText.toLowerCase();
      const name = (w.name || "").toLowerCase();
      const winery = (w.winery || "").toLowerCase();
      if (!name.includes(s) && !winery.includes(s)) return false;
    }
    return true;
  });


  return (
    <div className="container my-5">
      <h1 className="text-center text-danger mb-4">🍷 Winery App</h1>

      <div className="row mb-4">
        <div className="col-lg-4">
          <AddWineForm onAdd={addWine} />
        </div>

        <div className="col-lg-8">
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="row g-2 align-items-center">
                <div className="col-sm-5">
                  <label className="form-label mb-1"><strong>Filter by type</strong></label>
                  <select
                    className="form-select"
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Red">Red</option>
                    <option value="White">White</option>
                    <option value="Rose">Rosé</option>
                  </select>
                </div>

                <div className="col-sm-5">
                  <label className="form-label mb-1"><strong>Search</strong></label>
                  <input
                    className="form-control"
                    placeholder="Search by name or winery..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </div>

                <div className="col-sm-2 d-grid">
                  <label className="form-label mb-1">&nbsp;</label>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => { setFilterType("All"); setSearchText(""); }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <WineList wines={filteredWines} onDelete={deleteWine} onUpdate={updateWine} />
        </div>
      </div>
    </div>
  );
}

export default App;
